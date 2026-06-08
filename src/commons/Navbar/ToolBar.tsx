"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
    setEditText,
    setNewTitle,
    setSavePost,
    setSavePostShouldCloseEditor,
} from "@/store/editSlice";
import { showSuccess, showError } from "../Toast/toastHelpers";
import { updatePost } from "@/services/post.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { PostDescription } from "@/types/editor";
import {
    emptyEditorContent,
    serializeDescription,
} from "@/utils/editorContent";
import TooltipWrapper from "../Tooltip/Tooltip";
import Edit from "@/styles/icons/Edit";
import styles from "./toolbar.module.scss";


type PostBody = { title: string; description: PostDescription };

const ToolBar = () => {
    const { t } = useTranslation();
    const { data: session } = useSession();
    const userId = session?.user?.id
    const { id } = useParams<{ id: string }>();
    const postId = Number(id);
    const dispatch = useDispatch();
    const QueryClient = useQueryClient();
    const editText = useSelector((state: RootState) => state.edit.editText);
    const savePost = useSelector((state: RootState) => state.edit.savePost);
    const savePostShouldCloseEditor = useSelector(
        (state: RootState) => state.edit.savePostShouldCloseEditor
    );
    const newTitle = useSelector((state: RootState) => state.edit.newTitle);
    const newText = useSelector((state: RootState) => state.edit.newText);
    const currentTitle = useSelector((state: RootState) => state.edit.currentTitle);
    const currentDescription = useSelector((s: RootState) => s.edit.currentDescription);
    const normalize = (version?: string) =>
        (version ?? "").replace(/\s+/g, " ").trim();
    const isDirty =
        normalize(newTitle) !== normalize(currentTitle) ||
        serializeDescription(newText) !== serializeDescription(currentDescription);

    //guardado manual
    const { mutateAsync: updatePostMutation, isPending: isPendingEdit } =
        useMutation({
            mutationFn: ({
                body,
                postId,
                userId
            }: {
                body: PostBody;
                postId: number;
                userId: string
            }) => updatePost(body, postId, userId),
            mutationKey: ["editPost", postId, userId],
            onSuccess: async () => {
                showSuccess(t("entries.toast.saved"));
                await QueryClient.refetchQueries({
                    queryKey: ["onePost", postId],
                });
                await QueryClient.invalidateQueries({
                    queryKey: ["onePost", postId],
                });
            },
            onError: () => {
                if (!isDirty) {
                    showError(t("entries.toast.noChanges"));
                    return;
                }
                showError(t("entries.toast.editError"));
            },
        });

    const canSave = editText && isDirty && !isPendingEdit;

    const handlerEditPost = async (shouldCloseEditor = false) => {
        if (!canSave) {
            if (shouldCloseEditor) {
                dispatch(setEditText(false));
            }
            dispatch(setSavePost(false));
            dispatch(setSavePostShouldCloseEditor(true));
            return;
        }

        const body = {
            title: newTitle.trim(),
            description: newText ?? emptyEditorContent,
        };

        try {
            await updatePostMutation({ body, postId, userId });

            if (shouldCloseEditor) {
                dispatch(setEditText(false));
            }

            dispatch(setNewTitle(body.title));
        } finally {
            dispatch(setSavePost(false));
            dispatch(setSavePostShouldCloseEditor(true));
        }
    };

    React.useEffect(() => {
        if (!savePost) return;

        handlerEditPost(savePostShouldCloseEditor);
    }, [savePost, savePostShouldCloseEditor]);

    return (
        <div className={styles.containerToolBar}>
            <TooltipWrapper content={editText ? t("entries.toolbar.closeEdit") : t("entries.toolbar.edit")}>
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
