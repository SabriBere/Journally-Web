"use client";

import React from "react";
import type { Editor as TiptapEditor } from "@tiptap/react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setSavePost } from "@/store/editSlice";
import { deletePost } from "@/services/post.service";
import { showError, showSuccess } from "../Toast/toastHelpers";
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
    variant?: "danger" | "warning";
    onClick: () => void;
};

const iconColor = "#9e6b3e";

const getCurrentBlock = (editor: TiptapEditor) => {
    const activeHeading = headingLevels.find((level) =>
        editor.isActive("heading", { level })
    );

    return activeHeading ? `h${activeHeading}` : "p";
};

const EditorToolbar = ({ editor }: { editor: TiptapEditor | null }) => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const postId = Number(id);
    const newTitle = useSelector((state: RootState) => state.edit.newTitle);
    const [currentBlock, setCurrentBlock] = React.useState("p");

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

    React.useEffect(() => {
        if (!editor) return;

        const updateCurrentBlock = () => {
            setCurrentBlock(getCurrentBlock(editor));
        };

        updateCurrentBlock();
        editor.on("selectionUpdate", updateCurrentBlock);
        editor.on("transaction", updateCurrentBlock);

        return () => {
            editor.off("selectionUpdate", updateCurrentBlock);
            editor.off("transaction", updateCurrentBlock);
        };
    }, [editor]);

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
        await deletePostMutation({ postId });
    };

    const buttons: ToolbarButton[] = [
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
        {
            label: <Copy width="24" height="24" color={iconColor} />,
            title: "Copiar",
            variant: "warning",
            onClick: handleCopyPost,
        },
        {
            label: <Delete width="24" height="24" color="#ffffff" />,
            title: "Eliminar",
            variant: "danger",
            onClick: handleDeletePost,
        },
        {
            label: <Save width="24" height="24" color="#ffffff" />,
            title: "Guardar",
            isPrimary: true,
            onClick: () => dispatch(setSavePost(true)),
        },
    ];

    const handleBlockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        if (value === "p") {
            editor.chain().focus().setParagraph().run();
            setCurrentBlock("p");
            return;
        }

        const level = Number(value.replace("h", "")) as HeadingLevel;
        editor.chain().focus().toggleHeading({ level }).run();
        setCurrentBlock(value);
    };

    return (
        <div className={styles.editorToolbar} aria-label="Herramientas del editor">
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

            <div className={styles.toolbarActions}>
                {buttons.map((button) => (
                    <button
                        key={button.title}
                        type="button"
                        className={`${styles.toolbarButton} ${
                            button.isActive?.() ? styles.toolbarButtonActive : ""
                        } ${button.isPrimary ? styles.toolbarButtonPrimary : ""} ${
                            button.variant === "danger"
                                ? styles.toolbarButtonDanger
                                : ""
                        } ${
                            button.variant === "warning"
                                ? styles.toolbarButtonWarning
                                : ""
                        }`}
                        title={button.title}
                        aria-label={button.title}
                        aria-pressed={button.isActive?.() ?? false}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={button.onClick}
                    >
                        {button.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EditorToolbar;
