"use client";

import React from "react";
import type { Editor as TiptapEditor } from "@tiptap/react";
import { useDispatch } from "react-redux";
import { setSavePost } from "@/store/editSlice";
import Code from "@/styles/icons/Code";
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
    const dispatch = useDispatch();
    const [currentBlock, setCurrentBlock] = React.useState("p");

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
                        } ${button.isPrimary ? styles.toolbarButtonPrimary : ""}`}
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
