"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import type { Editor as TiptapEditor } from "@tiptap/react";
import { TextSelection } from "@tiptap/pm/state";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setAutoSaveEnabled, setSavePost } from "@/store/editSlice";
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
import Undo from "@/styles/icons/Undo";
import Italic from "@/styles/icons/Italic";
import Bold from "@/styles/icons/Bold";
import styles from "./editorToolbar.module.scss";

const headingLevels = [1, 2, 3, 4, 5, 6] as const;

type HeadingLevel = (typeof headingLevels)[number];

type ToolbarButton = {
    label: React.ReactNode;
    title: string;
    isActive?: () => boolean;
    isPrimary?: boolean;
    isPendingDanger?: boolean;
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

const autosaveStatusLabel: Record<AutosaveStatus, string> = {
    idle: "",
    saving: "",
    saved: "Guardado",
    error: "No se pudo guardar",
};

const autosaveStatusClass: Record<AutosaveStatus, string> = {
    idle: "",
    saving: styles.autosaveStatusSaving,
    saved: styles.autosaveStatusSaved,
    error: styles.autosaveStatusError,
};

const EditorToolbar = ({
    editor,
    autosaveStatus,
}: {
    editor: TiptapEditor | null;
    autosaveStatus: AutosaveStatus;
}) => {
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
    const [confirmDelete, setConfirmDelete] = useState(false);
    const lastCursorPositionRef = useRef<number | null>(null);

    const { mutateAsync: deletePostMutation } = useMutation({
        mutationFn: ({ postId }: { postId: number }) => deletePost(postId),
        mutationKey: ["deletePost", postId],
        onSuccess: async () => {
            showSuccess("Eliminado correctamente 🎉");
            await queryClient.refetchQueries({
                queryKey: ["getAllPost"],
            });
            router.push("/home");
        },
        onError: () => {
            showError("Error al eliminar post");
        },
    });

    useEffect(() => {
        if (!editor) return;

        const updateCurrentBlock = () => {
            const position = editor.state.selection.$head.pos;

            lastCursorPositionRef.current = position;
            setCurrentBlock(getCurrentBlockAtPosition(editor, position));
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

    if (!editor) return null;

    const handleCopyPost = async () => {
        const textToCopy = [newTitle, editor.getText()].filter(Boolean).join("\n\n");

        if (!textToCopy.trim()) {
            showError("No hay texto para copiar");
            return;
        }

        try {
            await navigator.clipboard.writeText(textToCopy);
            showSuccess("Texto copiado al portapapeles");
        } catch {
            showError("No se pudo copiar el texto");
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
            title: "Negrita",
            isActive: () => editor.isActive("bold"),
            onClick: () => editor.chain().focus().toggleBold().run(),
        },
        {
            label: <Italic width="24" height="24" color={iconColor} />,
            title: "Itálica",
            isActive: () => editor.isActive("italic"),
            onClick: () => editor.chain().focus().toggleItalic().run(),
        },
        {
            label: <Strikethrough width="24" height="24" color={iconColor} />,
            title: "Tachado",
            isActive: () => editor.isActive("strike"),
            onClick: () => editor.chain().focus().toggleStrike().run(),
        },
        {
            label: <List width="24" height="24" color={iconColor} />,
            title: "Lista con viñetas",
            isActive: () => editor.isActive("bulletList"),
            onClick: () => editor.chain().focus().toggleBulletList().run(),
        },
        {
            label: <OrderedList width="24" height="24" color={iconColor} />,
            title: "Lista numerada",
            isActive: () => editor.isActive("orderedList"),
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
        },
        {
            label: <ListItem width="24" height="24" color={iconColor} />,
            title: "Agregar item de lista",
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
            title: "Cita",
            isActive: () => editor.isActive("blockquote"),
            onClick: () => editor.chain().focus().toggleBlockquote().run(),
        },
        {
            label: <Code width="24" height="24" color={iconColor} />,
            title: "Bloque de código",
            isActive: () => editor.isActive("codeBlock"),
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
        },
        {
            label: <HorizontalRule width="24" height="24" color={iconColor} />,
            title: "Línea horizontal",
            onClick: () => editor.chain().focus().setHorizontalRule().run(),
        },
        {
            label: <Undo width="24" height="24" color={iconColor} />,
            title: "Deshacer",
            onClick: () => editor.chain().focus().undo().run(),
        },
        {
            label: <Redo width="24" height="24" color={iconColor} />,
            title: "Rehacer",
            onClick: () => editor.chain().focus().redo().run(),
        },
    ];

    const utilityButtons: ToolbarButton[] = [
        {
            label: <Copy width="24" height="24" color={iconColor} />,
            title: "Copiar",
            variant: "warning",
            onClick: handleCopyPost,
        },
        {
            label: <Delete width="24" height="24" color="#ffffff" />,
            title: confirmDelete ? "Confirmar eliminación" : "Eliminar",
            variant: "danger",
            isPendingDanger: confirmDelete,
            onClick: handleDeletePost,
        },
        {
            label: <Save width="24" height="24" color="#ffffff" />,
            title: "Guardar",
            isPrimary: true,
            onClick: () => dispatch(setSavePost(true)),
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
            onMouseDown={(e) => e.preventDefault()}
            onClick={button.onClick}
        >
            {button.label}
            {button.isPendingDanger && (
                <span className={styles.confirmDeleteLabel}>Confirmar</span>
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

    return (
        <div className={styles.editorToolbar} aria-label="Herramientas del editor">
            <div className={styles.toolbarBlockGroup}>
                <select
                    className={styles.blockSelect}
                    value={currentBlock}
                    onChange={handleBlockChange}
                    aria-label="Tipo de bloque"
                >
                    <option value="p">Párrafo</option>
                    {headingLevels.map((level) => (
                        <option key={level} value={`h${level}`}>
                            H{level}
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
                    isLoading={autoSaveEnabled && autosaveStatus === "saving"}
                    label=""
                    name="autosave"
                    title="Autoguardado"
                    onChange={(checked) => dispatch(setAutoSaveEnabled(checked))}
                />

                {autoSaveEnabled &&
                    autosaveStatus !== "idle" &&
                    autosaveStatus !== "saving" && (
                        <span
                            className={`${styles.autosaveStatus} ${
                                autosaveStatusClass[autosaveStatus]
                            }`}
                            aria-live="polite"
                        >
                            {autosaveStatusLabel[autosaveStatus]}
                        </span>
                    )}

                {utilityButtons
                    .filter((button) => button.variant !== "danger")
                    .map(renderButton)}
            </div>
        </div>
    );
};

export default EditorToolbar;
