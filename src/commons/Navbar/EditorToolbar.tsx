"use client";

import React from "react";
import type { Editor as TiptapEditor } from "@tiptap/react";
import Code from "@/styles/icons/Code";
import Quote from "@/styles/icons/Quote";
import Redo from "@/styles/icons/Redo";
import Undo from "@/styles/icons/Undo";
import styles from "./editorToolbar.module.scss";

const headingLevels = [1, 2, 3, 4, 5, 6] as const;

type HeadingLevel = (typeof headingLevels)[number];

type ToolbarButton = {
    label: React.ReactNode;
    title: string;
    isActive?: () => boolean;
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
    if (!editor) return null;

    const buttons: ToolbarButton[] = [
        {
            label: "B",
            title: "Negrita",
            isActive: () => editor.isActive("bold"),
            onClick: () => editor.chain().focus().toggleBold().run(),
        },
        {
            label: "I",
            title: "Itálica",
            isActive: () => editor.isActive("italic"),
            onClick: () => editor.chain().focus().toggleItalic().run(),
        },
        {
            label: "S",
            title: "Tachado",
            isActive: () => editor.isActive("strike"),
            onClick: () => editor.chain().focus().toggleStrike().run(),
        },
        {
            label: "<>",
            title: "Código en línea",
            isActive: () => editor.isActive("code"),
            onClick: () => editor.chain().focus().toggleCode().run(),
        },
        {
            label: "UL",
            title: "Lista con viñetas",
            isActive: () => editor.isActive("bulletList"),
            onClick: () => editor.chain().focus().toggleBulletList().run(),
        },
        {
            label: "OL",
            title: "Lista numerada",
            isActive: () => editor.isActive("orderedList"),
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
        },
        {
            label: "LI",
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
            label: "HR",
            title: "Línea horizontal",
            onClick: () => editor.chain().focus().setHorizontalRule().run(),
        },
        {
            label: "BR",
            title: "Salto de línea",
            onClick: () => editor.chain().focus().setHardBreak().run(),
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

    const handleBlockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        if (value === "p") {
            editor.chain().focus().setParagraph().run();
            return;
        }

        const level = Number(value.replace("h", "")) as HeadingLevel;
        editor.chain().focus().toggleHeading({ level }).run();
    };

    return (
        <div className={styles.editorToolbar} aria-label="Herramientas del editor">
            <select
                className={styles.blockSelect}
                value={getCurrentBlock(editor)}
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
