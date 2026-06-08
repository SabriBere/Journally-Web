"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import type { Editor as TiptapEditor } from "@tiptap/react";
import { TextSelection } from "@tiptap/pm/state";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { RootState } from "@/store/store";
import {
    setAutoSaveEnabled,
    setSavePost,
    setSavePostShouldCloseEditor,
} from "@/store/editSlice";
import { deletePost } from "@/services/post.service";
import { showError, showSuccess } from "../Toast/toastHelpers";
import Switch from "@/commons/Switch";
import Code from "@/styles/icons/Code";
import Copy from "@/styles/icons/Copy";
import Delete from "@/styles/icons/Delete";
import HorizontalRule from "@/styles/icons/HorizontalRule";
import List from "@/styles/icons/List";
import ListItem from "@/styles/icons/ListItem";
import OrderedList from "@/styles/icons/OrderedList";
import Quote from "@/styles/icons/Quote";
import Redo from "@/styles/icons/Redo";
import Save from "@/styles/icons/Save";
import Strikethrough from "@/styles/icons/Strikethrough";
import Sync from "@/styles/icons/Sync";
import Undo from "@/styles/icons/Undo";
import Italic from "@/styles/icons/Italic";
import Bold from "@/styles/icons/Bold";
import styles from "./editorToolbar.module.scss";

const headingLevels = [1, 2, 3, 4, 5, 6] as const;
const defaultFontSize = "16px";
const fontSizeOptions = [
    "8px",
    "10px",
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "28px",
    "32px",
];

type HeadingLevel = (typeof headingLevels)[number];

type ToolbarButton = {
    label: React.ReactNode;
    title: string;
    isActive?: () => boolean;
    isPrimary?: boolean;
    isPendingDanger?: boolean;
    disabled?: boolean;
    variant?: "danger" | "warning";
    onClick: () => void;
};

type AutosaveStatus = "idle" | "saving" | "saved" | "error";

const iconColor = "#9e6b3e";

const getCurrentBlockAtPosition = (editor: TiptapEditor, position: number) => {
    const resolvedPosition = Math.min(
        Math.max(position, 1),
        editor.state.doc.content.size
    );
    const $position = editor.state.doc.resolve(resolvedPosition);

    for (let depth = $position.depth; depth > 0; depth -= 1) {
        const node = $position.node(depth);

        if (!node.isTextblock) continue;

        if (node.type.name === "heading") {
            return `h${node.attrs.level}`;
        }

        return "p";
    }

    return "p";
};

const getCurrentFontSize = (editor: TiptapEditor) => {
    const fontSize = editor.getAttributes("textStyle").fontSize;

    return typeof fontSize === "string" ? fontSize : defaultFontSize;
};

const setCurrentTextBlockAtPosition = (
    editor: TiptapEditor,
    position: number,
    typeName: "paragraph" | "heading",
    attrs?: Record<string, unknown>
) =>
    editor
        .chain()
        .focus()
        .command(({ state, tr, dispatch }) => {
            const nodeType = state.schema.nodes[typeName];

            if (!nodeType) return false;

            const resolvedPosition = Math.min(
                Math.max(position, 1),
                state.doc.content.size
            );
            const $position = state.doc.resolve(resolvedPosition);

            for (let depth = $position.depth; depth > 0; depth -= 1) {
                const node = $position.node(depth);

                if (!node.isTextblock) continue;

                const parent = $position.node(depth - 1);
                const index = $position.index(depth - 1);

                if (!parent.canReplaceWith(index, index + 1, nodeType)) {
                    return false;
                }

                tr.setNodeMarkup($position.before(depth), nodeType, attrs);
                tr.setSelection(
                    TextSelection.near(
                        tr.doc.resolve(
                            Math.min(resolvedPosition, tr.doc.content.size)
                        )
                    )
                );
                dispatch?.(tr.scrollIntoView());
                return true;
            }

            return false;
        })
        .run();

const EditorToolbar = ({
    editor,
    autosaveStatus,
}: {
    editor: TiptapEditor | null;
    autosaveStatus: AutosaveStatus;
}) => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const postId = Number(id);
    const newTitle = useSelector((state: RootState) => state.edit.newTitle);
    const autoSaveEnabled = useSelector(
        (state: RootState) => state.edit.autoSaveEnabled
    );
    const [currentBlock, setCurrentBlock] = useState("p");
    const [currentFontSize, setCurrentFontSize] = useState(defaultFontSize);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showAutosaveSaving, setShowAutosaveSaving] = useState(false);
    const lastCursorPositionRef = useRef<number | null>(null);
    const autosaveSavingTimerRef = useRef<number | null>(null);

    const { mutateAsync: deletePostMutation } = useMutation({
        mutationFn: ({ postId }: { postId: number }) => deletePost(postId),
        mutationKey: ["deletePost", postId],
        onSuccess: async () => {
            showSuccess(t("entries.toast.deleted"));
            await queryClient.refetchQueries({
                queryKey: ["getAllPost"],
            });
            router.push("/home");
        },
        onError: () => {
            showError(t("entries.toast.deleteError"));
        },
    });

    useEffect(() => {
        if (!editor) return;

        const updateCurrentBlock = () => {
            const position = editor.state.selection.$head.pos;

            lastCursorPositionRef.current = position;
            setCurrentBlock(getCurrentBlockAtPosition(editor, position));
            setCurrentFontSize(getCurrentFontSize(editor));
        };

        updateCurrentBlock();
        editor.on("selectionUpdate", updateCurrentBlock);
        editor.on("transaction", updateCurrentBlock);

        return () => {
            editor.off("selectionUpdate", updateCurrentBlock);
            editor.off("transaction", updateCurrentBlock);
        };
    }, [editor]);

    useEffect(() => {
        if (!confirmDelete) return;

        const timer = window.setTimeout(() => {
            setConfirmDelete(false);
        }, 4000);

        return () => {
            window.clearTimeout(timer);
        };
    }, [confirmDelete]);

    useEffect(() => {
        if (!autoSaveEnabled) {
            setShowAutosaveSaving(false);

            if (autosaveSavingTimerRef.current) {
                window.clearTimeout(autosaveSavingTimerRef.current);
                autosaveSavingTimerRef.current = null;
            }

            return;
        }

        if (autosaveStatus === "saving") {
            setShowAutosaveSaving(true);

            if (autosaveSavingTimerRef.current) {
                window.clearTimeout(autosaveSavingTimerRef.current);
                autosaveSavingTimerRef.current = null;
            }

            return;
        }

        if (!showAutosaveSaving || autosaveSavingTimerRef.current) return;

        autosaveSavingTimerRef.current = window.setTimeout(() => {
            setShowAutosaveSaving(false);
            autosaveSavingTimerRef.current = null;
        }, 2000);

        return () => {
            if (autosaveSavingTimerRef.current) {
                window.clearTimeout(autosaveSavingTimerRef.current);
                autosaveSavingTimerRef.current = null;
            }
        };
    }, [autoSaveEnabled, autosaveStatus, showAutosaveSaving]);

    if (!editor) return null;

    const handleCopyPost = async () => {
        const textToCopy = [newTitle, editor.getText()].filter(Boolean).join("\n\n");

        if (!textToCopy.trim()) {
            showError(t("entries.toast.noTextToCopy"));
            return;
        }

        try {
            await navigator.clipboard.writeText(textToCopy);
            showSuccess(t("entries.toast.copied"));
        } catch {
            showError(t("entries.toast.copyError"));
        }
    };

    const handleDeletePost = async () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }

        await deletePostMutation({ postId });
    };

    const formatButtons: ToolbarButton[] = [
        {
            label: <Bold width="24" height="24" color={iconColor} />,
            title: t("entries.toolbar.bold"),
            isActive: () => editor.isActive("bold"),
            onClick: () => editor.chain().focus().toggleBold().run(),
        },
        {
            label: <Italic width="24" height="24" color={iconColor} />,
            title: t("entries.toolbar.italic"),
            isActive: () => editor.isActive("italic"),
            onClick: () => editor.chain().focus().toggleItalic().run(),
        },
        {
            label: <Strikethrough width="24" height="24" color={iconColor} />,
            title: t("entries.toolbar.strike"),
            isActive: () => editor.isActive("strike"),
            onClick: () => editor.chain().focus().toggleStrike().run(),
        },
        {
            label: <List width="24" height="24" color={iconColor} />,
            title: t("entries.toolbar.bulletList"),
            isActive: () => editor.isActive("bulletList"),
            onClick: () => editor.chain().focus().toggleBulletList().run(),
        },
        {
            label: <OrderedList width="24" height="24" color={iconColor} />,
            title: t("entries.toolbar.orderedList"),
            isActive: () => editor.isActive("orderedList"),
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
        },
        {
            label: <ListItem width="24" height="24" color={iconColor} />,
            title: t("entries.toolbar.addListItem"),
            onClick: () => {
                if (
                    !editor.isActive("bulletList") &&
                    !editor.isActive("orderedList")
                ) {
                    editor.chain().focus().toggleBulletList().run();
                    return;
                }

                editor.chain().focus().splitListItem("listItem").run();
            },
        },
        {
            label: <Quote width="24" height="24" color={iconColor} />,
            title: t("entries.toolbar.quote"),
            isActive: () => editor.isActive("blockquote"),
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
        },
        {
            label: <Code width="24" height="24" color={iconColor} />,
            title: t("entries.toolbar.codeBlock"),
            isActive: () => editor.isActive("codeBlock"),
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
        },
        {
            label: <HorizontalRule width="24" height="24" color={iconColor} />,
            title: t("entries.toolbar.horizontalRule"),
            onClick: () => editor.chain().focus().setHorizontalRule().run(),
        },
        {
            label: <Undo width="24" height="24" color={iconColor} />,
            title: t("entries.toolbar.undo"),
            onClick: () => editor.chain().focus().undo().run(),
        },
        {
            label: <Redo width="24" height="24" color={iconColor} />,
            title: t("entries.toolbar.redo"),
            onClick: () => editor.chain().focus().redo().run(),
        },
    ];

    const utilityButtons: ToolbarButton[] = [
        {
            label: <Copy width="24" height="24" color={iconColor} />,
            title: t("entries.toolbar.copy"),
            variant: "warning",
            onClick: handleCopyPost,
        },
        {
            label: <Delete width="24" height="24" color="#ffffff" />,
            title: confirmDelete ? t("entries.toolbar.confirmDelete") : t("entries.toolbar.delete"),
            variant: "danger",
            isPendingDanger: confirmDelete,
            onClick: handleDeletePost,
        },
        {
            label:
                autoSaveEnabled && showAutosaveSaving ? (
                    <span className={styles.toolbarButtonSpinner}>
                        <Sync width="24" height="24" color="#ffffff" />
                    </span>
                ) : (
                    <Save width="24" height="24" color="#ffffff" />
                ),
            title:
                autoSaveEnabled && showAutosaveSaving
                    ? t("entries.toolbar.savingChanges")
                    : autoSaveEnabled
                      ? t("entries.toolbar.autosaveEnabled")
                      : t("entries.toolbar.save"),
            isPrimary: true,
            disabled: autoSaveEnabled,
            onClick: () => {
                dispatch(setSavePostShouldCloseEditor(false));
                dispatch(setSavePost(true));
            },
        },
    ];

    const renderButton = (button: ToolbarButton) => (
        <button
            key={button.title}
            type="button"
            className={`${styles.toolbarButton} ${
                button.isActive?.() ? styles.toolbarButtonActive : ""
            } ${button.isPrimary ? styles.toolbarButtonPrimary : ""} ${
                button.variant === "danger" ? styles.toolbarButtonDanger : ""
            } ${button.variant === "warning" ? styles.toolbarButtonWarning : ""} ${
                button.isPendingDanger ? styles.toolbarButtonDangerPending : ""
            }`}
            title={button.title}
            aria-label={button.title}
            aria-pressed={button.isActive?.() ?? false}
            disabled={button.disabled}
            onMouseDown={(e) => e.preventDefault()}
            onClick={button.onClick}
        >
            {button.label}
            {button.isPendingDanger && (
                <span className={styles.confirmDeleteLabel}>
                    {t("entries.toolbar.confirm")}
                </span>
            )}
        </button>
    );

    const handleBlockChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        const cursorPosition =
            lastCursorPositionRef.current ?? editor.state.selection.$head.pos;

        if (value === "p") {
            setCurrentTextBlockAtPosition(editor, cursorPosition, "paragraph");
            setCurrentBlock("p");
            return;
        }

        const level = Number(value.replace("h", "")) as HeadingLevel;
        setCurrentTextBlockAtPosition(editor, cursorPosition, "heading", { level });
        setCurrentBlock(value);
    };

    const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const fontSize = e.target.value;

        setCurrentFontSize(fontSize);

        editor
            .chain()
            .focus()
            .setMark("textStyle", { fontSize: fontSize || null })
            .run();
    };

    return (
        <div className={styles.editorToolbar} aria-label={t("entries.toolbar.ariaLabel")}>
            <div className={styles.toolbarBlockGroup}>
                <select
                    className={`${styles.blockSelect} ${styles.textBlockSelect}`}
                    value={currentBlock}
                    onChange={handleBlockChange}
                    aria-label={t("entries.toolbar.blockType")}
                >
                    <option value="p">{t("entries.toolbar.paragraph")}</option>
                    {headingLevels.map((level) => (
                        <option key={level} value={`h${level}`}>
                            H{level}
                        </option>
                    ))}
                </select>

                <select
                    className={`${styles.blockSelect} ${styles.fontSizeSelect}`}
                    value={currentFontSize}
                    onChange={handleFontSizeChange}
                    aria-label={t("entries.toolbar.fontSize")}
                    title={t("entries.toolbar.fontSize")}
                >
                    {fontSizeOptions.map((fontSize) => (
                        <option key={fontSize} value={fontSize}>
                            {fontSize}
                        </option>
                    ))}
                </select>
            </div>

            <div className={`${styles.toolbarSection} ${styles.toolbarFormatSection}`}>
                {formatButtons.map(renderButton)}
            </div>

            <div className={styles.toolbarDangerZone}>
                {utilityButtons
                    .filter((button) => button.variant === "danger")
                    .map(renderButton)}
            </div>

            <div className={`${styles.toolbarSection} ${styles.toolbarUtilitySection}`}>
                <Switch
                    checked={autoSaveEnabled}
                    label=""
                    name="autosave"
                    title={t("entries.toolbar.autosave")}
                    onChange={(checked) => dispatch(setAutoSaveEnabled(checked))}
                />

                {utilityButtons
                    .filter((button) => button.variant !== "danger")
                    .map(renderButton)}
            </div>
        </div>
    );
};

export default EditorToolbar;
