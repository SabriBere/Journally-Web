"use client";
import React from "react";
import { useParams } from "next/navigation";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
    setEditText,
    setNewTitle,
    setSavePost,
} from "@/store/editSlice";
import { showSuccess, showError } from "../Toast/toastHelpers";
import { updatePost } from "@/services/post.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TooltipWrapper from "../Tooltip/Tooltip";
import Edit from "@/styles/icons/Edit";
import type { PostDescription } from "@/types/editor";
import {
    emptyEditorContent,
    serializeDescription,
} from "@/utils/editorContent";
import styles from "./toolbar.module.scss";

type PostBody = { title: string; description: PostDescription };

const ToolBar = () => {
    const { id } = useParams<{ id: string }>();
    const postId = Number(id);
    const dispatch = useDispatch();
    const QueryClient = useQueryClient();
    const editText = useSelector((state: RootState) => state.edit.editText);
    const savePost = useSelector((state: RootState) => state.edit.savePost);
    const newTitle = useSelector((state: RootState) => state.edit.newTitle);
    const newText = useSelector((state: RootState) => state.edit.newText);
    const currentTitle = useSelector((state: RootState) => state.edit.currentTitle);
    const currentDescription = useSelector((s: RootState) => s.edit.currentDescription);
    const normalize = (version?: string) =>
        (version ?? "").replace(/\s+/g, " ").trim();
    const isDirty =
        normalize(newTitle) !== normalize(currentTitle) ||
        serializeDescription(newText) !== serializeDescription(currentDescription);

    const { mutateAsync: updatePostMutation, isPending: isPendingEdit } =
        useMutation({
            mutationFn: ({
                body,
                postId,
            }: {
                body: PostBody;
                postId: number;
            }) => updatePost(body, postId),
            mutationKey: ["editPost", postId],
            onSuccess: async () => {
                showSuccess("Guardado correctamente 🎉");
                await QueryClient.refetchQueries({
                    queryKey: ["onePost", postId],
                });
                await QueryClient.invalidateQueries({
                    queryKey: ["onePost", postId],
                });
            },
            onError: () => {
                if (!isDirty) {
                    showError("No hay cambios para guardar");
                    return;
                }
                showError("Error al editar");
            },
        });

    const canSave = editText && isDirty && !isPendingEdit;

    const handlerEditPost = async (shouldCloseEditor = false) => {
        if (!canSave) {
            if (shouldCloseEditor) {
                dispatch(setEditText(false));
                dispatch(setSavePost(false));
            }
            return;
        }

        const body = {
            title: newTitle.trim(),
            description: newText ?? emptyEditorContent,
        };
        await updatePostMutation({ body, postId });

        dispatch(setEditText(false));
        dispatch(setNewTitle(body.title));
        dispatch(setSavePost(false));
    };

    React.useEffect(() => {
        if (!savePost) return;

        handlerEditPost(true);
    }, [savePost]);

    return (
        <div className={styles.containerToolBar}>
            <TooltipWrapper content={editText ? "Cerrar edición" : "Editar"}>
                <button
                    className={styles.buttonEdit}
                    onClick={() => dispatch(setEditText(!editText))}
                    aria-pressed={editText}
                >
                    <Edit color="white" width="24" height="24" />
                </button>
            </TooltipWrapper>
        </div>
    );
};

export default ToolBar;
