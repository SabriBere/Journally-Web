"use client";
import React, { useEffect, useRef, useState } from "react";
import { Extension } from "@tiptap/core";
import { EditorContent, useEditor } from "@tiptap/react";
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
import Error from "@/commons/EmptyStates/Error";
import EditorToolbar from "@/commons/Navbar/EditorToolbar";
import SkeletonEditor from "@/commons/Skeletons/SkeletonEditor";
import styles from "./editor.module.scss";

const emptyEditorContent = "<p></p>";

const exitEmptyListItem = Extension.create({
  name: "exitEmptyListItem",

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { $from, empty } = this.editor.state.selection;
        const isEmptyListItem =
          empty &&
          this.editor.isActive("listItem") &&
          $from.parent.type.name === "paragraph" &&
          $from.parent.textContent.length === 0;

        if (!isEmptyListItem) return false;

        return this.editor.commands.liftListItem("listItem");
      },
    };
  },
});

const Tiptap = () => {
  const { id } = useParams();
  const convertId = Number(id);
  const dispatch = useDispatch();
  const editText = useSelector((state: RootState) => state.edit.editText);
  const newTitle = useSelector((state: RootState) => state.edit.newTitle);
  const [focusTitleInput, setFocusTitleInput] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const editor = useEditor({
    extensions: [StarterKit, TextStyleKit, exitEmptyListItem],
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
          <div className={styles.editorTop}>
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
          </div>

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
