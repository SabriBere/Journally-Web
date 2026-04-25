"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  EditorContent,
  useEditor,
  type Editor as TiptapEditor,
} from "@tiptap/react";
import { TextStyleKit } from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/services/post.service";
import { converDate } from "@/utils/formatDate";
import {
  setCuerrentDescription,
  setCurrentTtitle,
  setEditText,
  setSavePost,
  setNewText,
  setNewTitle,
} from "@/store/editSlice";
import Redo from "@/styles/icons/Redo";
import Undo from "@/styles/icons/Undo";
import Code from "@/styles/icons/Code";
import Quote from "@/styles/icons/Quote";
import Error from "@/commons/EmptyStates/Error";
import SkeletonEditor from "@/commons/Skeletons/SkeletonEditor";
import styles from "./editor.module.scss";

const emptyEditorContent = "<p></p>";
const headingLevels = [1, 2, 3, 4, 5, 6] as const;

type HeadingLevel = (typeof headingLevels)[number];

type ToolbarButton = {
  label: any;
  title: string;
  isActive?: () => boolean;
  onClick: () => void;
};

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
        if (!editor.isActive("bulletList") && !editor.isActive("orderedList")) {
          editor.chain().focus().toggleBulletList().run();
          return;
        }

        editor.chain().focus().splitListItem("listItem").run();
      },
    },
    {
      label: <Quote width="24" height="24" color="#9e6b3e" />,
      title: "Cita",
      isActive: () => editor.isActive("blockquote"),
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      label: <Code width="24" height="24" color="#9e6b3e" />,
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
      label: <Undo width="24" height="24" color="#9e6b3e" />,
      title: "Deshacer",
      onClick: () => editor.chain().focus().undo().run(),
    },
    {
      label: <Redo width="24" height="24" color="#9e6b3e" />,
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
            className={`${styles.toolbarButton} ${button.isActive?.() ? styles.toolbarButtonActive : ""
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

const Tiptap = () => {
  const { id } = useParams();
  const convertId = Number(id);
  const dispatch = useDispatch();
  const editText = useSelector((state: RootState) => state.edit.editText);
  const newTitle = useSelector((state: RootState) => state.edit.newTitle);
  const [focusTitleInput, setFocusTitleInput] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const editor = useEditor({
    extensions: [StarterKit, TextStyleKit],
    content: emptyEditorContent,
    editable: editText,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      dispatch(setNewText(editor.getHTML()));
    },
  });

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNewTitle(e.target.value));
  };

  const {
    data: entry,
    isSuccess,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["onePost", convertId],
    queryFn: () => getPostById(convertId as number),
    enabled: !!convertId,
  });

  useEffect(() => {
    if (!entry) return;

    const title = entry.title ?? "";
    const description = entry.description ?? "";

    dispatch(setCurrentTtitle(title));
    dispatch(setNewTitle(title));
    dispatch(setCuerrentDescription(description));
    dispatch(setNewText(description));
  }, [entry, dispatch]);

  useEffect(() => {
    if (!editor || !entry) return;

    editor.commands.setContent(
      entry.description?.trim() ? entry.description : emptyEditorContent,
      { emitUpdate: false }
    );
  }, [editor, entry]);

  useEffect(() => {
    editor?.setEditable(editText);

    if (!editText) {
      setFocusTitleInput(false);
    }
  }, [editor, editText]);

  useEffect(() => {
    if (!editText) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;

      if (!target || editorRef.current?.contains(target)) return;

      dispatch(setSavePost(true));
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [editText, dispatch]);

  const handleEnableTitleEdit = () => {
    if (!entry) return;

    dispatch(setCurrentTtitle(entry.title ?? ""));
    dispatch(setNewTitle(entry.title ?? ""));
    dispatch(setCuerrentDescription(entry.description ?? ""));
    dispatch(setNewText(entry.description ?? ""));
    dispatch(setEditText(true));
    setFocusTitleInput(true);
  };

  return (
    <>
      {isLoading && <SkeletonEditor />}
      {isError && (
        <div className={styles.containerError}>
          <Error />
        </div>
      )}
      {isSuccess && (
        <div className={styles.containerPaper} ref={editorRef}>
          <div className={styles.header}>
            {editText ? (
              <input
                className={styles.titleInput}
                value={newTitle}
                onChange={handleChangeTitle}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    dispatch(setSavePost(true));
                  }
                }}
                placeholder="Escribir título..."
                autoFocus={focusTitleInput}
              />
            ) : (
              <button
                type="button"
                className={styles.titleButton}
                onClick={handleEnableTitleEdit}
              >
                <h1>{entry?.title}</h1>
              </button>
            )}
            <p>{`${converDate(entry?.created_at)}`}</p>
          </div>

          {editText && <EditorToolbar editor={editor} />}

          <EditorContent
            editor={editor}
            className={
              editText ? styles.tiptapEditor : styles.tiptapText
            }
          />
        </div>
      )}
    </>
  );
};

export default Tiptap;
