"use client";
import React, { useEffect, useRef, useState } from "react";
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
import SkeletonEditor from "@/commons/Skeletons/SkeletonEditor";
import styles from "./editor.module.scss";

const Editor = () => {
    const { id } = useParams();
    const convertId = Number(id);
    const dispatch = useDispatch();
    const editText = useSelector((state: RootState) => state.edit.editText);
    const newTitle = useSelector((state: RootState) => state.edit.newTitle);
    const newText = useSelector((state: RootState) => state.edit.newText);
    const [focusTitleInput, setFocusTitleInput] = useState(false);
    const editorRef = useRef<HTMLDivElement | null>(null);

    const handlerChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setNewText(e.target.value));
    };

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
        if (editText && entry) {
            dispatch(setCurrentTtitle(entry.title ?? ""));
            dispatch(setNewTitle(entry.title ?? ""));
            dispatch(setCuerrentDescription(entry.description ?? ""));
            dispatch(setNewText(entry.description ?? ""));
        }
    }, [editText, entry, dispatch]);

    useEffect(() => {
        if (!editText) {
            setFocusTitleInput(false);
        }
    }, [editText]);

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

                    {/* Ver la posibilidad de usar markdown */}
                    {editText === false ? (
                        <div className={styles.text}>
                            <p>{entry?.description}</p>
                        </div>
                    ) : (
                        <textarea
                            className={styles.editorInput}
                            placeholder="Escribir..."
                            value={newText}
                            onChange={handlerChangeText}
                            cols={30}
                            rows={15}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default Editor;
