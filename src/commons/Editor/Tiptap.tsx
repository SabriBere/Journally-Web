"use client";
import React, { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
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
} from "@/utils/editorContent";
import { useSocket } from "@/contexts/SocketContext";
import { editorExtensions } from "./editorConfig";
import styles from "./editor.module.scss";

type AutosaveSocketMessage = {
  type?: string;
  error?: boolean;
  clientRequestId?: string;
};

type AutosaveStatus = "idle" | "saving" | "saved" | "error";

const Tiptap = () => {
  const { id } = useParams();
  const convertId = Number(id);
  const dispatch = useDispatch();
  const { status: socketStatus, sendJson, lastJsonMessage } = useSocket();
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
  const [autosaveStatus, setAutosaveStatus] =
    useState<AutosaveStatus>("idle");
  const editorRef = useRef<HTMLDivElement | null>(null);
  const pendingAutosaveRequestIdRef = useRef<string | null>(null);

  const editor = useEditor({
    extensions: editorExtensions,
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

  //guardado automatico
  useEffect(() => {
    const autosaveTimer = window.setTimeout(() => {
      const body = {
        title: newTitle.trim(),
        description: newText ?? emptyEditorContent,
      };
      const clientRequestId = `${convertId}-${Date.now()}`;

      const wasSent = sendJson({
        type: "entry:autosave",
        postId: convertId,
        ...body,
        clientRequestId,
      });

      if (!wasSent) {
        setAutosaveStatus("error");
        // console.warn("No se pudo enviar el autoguardado por socket");
        return;
      }

      pendingAutosaveRequestIdRef.current = clientRequestId;
      setAutosaveStatus("saving");

      // console.info("Autoguardado enviado por socket", {
      //   postId: convertId,
      //   clientRequestId,
      // });
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
    const message = lastJsonMessage as AutosaveSocketMessage | null;

    if (
      !message ||
      !message.clientRequestId ||
      message.clientRequestId !== pendingAutosaveRequestIdRef.current
    ) {
      return;
    }

    if (message.type === "entry:saved") {
      setAutosaveStatus("saved");
      pendingAutosaveRequestIdRef.current = null;
      return;
    }

    if (message.type === "entry:error" || message.error) {
      setAutosaveStatus("error");
      pendingAutosaveRequestIdRef.current = null;
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    if (!autoSaveEnabled || !editText) {
      setAutosaveStatus("idle");
    }
  }, [autoSaveEnabled, editText]);

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

            {editText && (
              <EditorToolbar editor={editor} autosaveStatus={autosaveStatus} />
            )}
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
