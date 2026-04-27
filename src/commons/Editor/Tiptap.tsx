"use client";
import React, { useEffect, useRef, useState } from "react";
import { Extension } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";
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
import ToolBar from "@/commons/Navbar/ToolBar";
import SkeletonEditor from "@/commons/Skeletons/SkeletonEditor";
import {
  emptyEditorContent,
  normalizeEditorContent,
  serializeDescription,
} from "@/utils/editorContent";
import { useSocket } from "@/contexts/SocketContext";
import styles from "./editor.module.scss";

const htmlTagPattern =
  /<\/?(h[1-6]|p|ul|ol|li|blockquote|pre|code|strong|em|s|br|hr)\b[^>]*>/i;

const decodeHtmlEntities = (value: string) =>
  value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");

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

const interpretPastedHtmlText = Extension.create({
  name: "interpretPastedHtmlText",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste: (_view, event) => {
            const plainText = event.clipboardData?.getData("text/plain");

            if (
              !plainText ||
              !htmlTagPattern.test(decodeHtmlEntities(plainText))
            ) {
              return false;
            }

            event.preventDefault();
            this.editor.commands.insertContent(normalizeEditorContent(plainText));
            return true;
          },
        },
      }),
    ];
  },
});

const exitHeadingOnEnter = Extension.create({
  name: "exitHeadingOnEnter",

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { empty, $from } = this.editor.state.selection;

        if (!empty || $from.parent.type.name !== "heading") return false;

        return this.editor.chain().splitBlock().setParagraph().run();
      },
    };
  },
});

const Tiptap = () => {
  const { id } = useParams();
  const convertId = Number(id);
  const dispatch = useDispatch();
  const { status: socketStatus, sendJson } = useSocket();
  const editText = useSelector((state: RootState) => state.edit.editText);
  const autoSaveEnabled = useSelector(
    (state: RootState) => state.edit.autoSaveEnabled
  );
  const newTitle = useSelector((state: RootState) => state.edit.newTitle);
  const newText = useSelector((state: RootState) => state.edit.newText);
  const currentTitle = useSelector((state: RootState) => state.edit.currentTitle);
  const currentDescription = useSelector(
    (state: RootState) => state.edit.currentDescription
  );
  const [focusTitleInput, setFocusTitleInput] = useState(false);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const normalizeTitle = (title?: string) =>
    (title ?? "").replace(/\s+/g, " ").trim();

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyleKit,
      exitEmptyListItem,
      interpretPastedHtmlText,
      exitHeadingOnEnter,
    ],
    content: emptyEditorContent,
    editable: editText,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      dispatch(setNewText(editor.getJSON()));
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
    const description = normalizeEditorContent(entry.description);

    dispatch(setCurrentTtitle(title));
    dispatch(setNewTitle(title));
    dispatch(setCuerrentDescription(description));
    dispatch(setNewText(description));
  }, [entry, dispatch]);

  useEffect(() => {
    if (!editor || !entry) return;

    editor.commands.setContent(
      normalizeEditorContent(entry.description),
      { emitUpdate: false }
    );
  }, [editor, entry]);

  useEffect(() => {
    const isDirty =
      normalizeTitle(newTitle) !== normalizeTitle(currentTitle) ||
      serializeDescription(newText) !== serializeDescription(currentDescription);

    if (
      !editText ||
      !autoSaveEnabled ||
      !isDirty ||
      socketStatus !== "open" ||
      !convertId
    ) {
      return;
    }

    const autosaveTimer = window.setTimeout(() => {
      const body = {
        title: newTitle.trim(),
        description: newText ?? emptyEditorContent,
      };

      sendJson({
        type: "autosave",
        payload: {
          postId: convertId,
          ...body,
        },
      });
    }, 700);

    return () => {
      window.clearTimeout(autosaveTimer);
    };
  }, [
    editText,
    autoSaveEnabled,
    newTitle,
    newText,
    currentTitle,
    currentDescription,
    socketStatus,
    convertId,
    sendJson,
  ]);

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
    const description = normalizeEditorContent(entry.description);

    dispatch(setCuerrentDescription(description));
    dispatch(setNewText(description));
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
              <div className={styles.headerMain}>
                <div className={styles.headerContent}>
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

                <ToolBar />
              </div>
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
