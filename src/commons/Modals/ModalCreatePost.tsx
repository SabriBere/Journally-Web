"use client";
import React, { ChangeEvent, useState } from "react";
import { createPost } from "@/services/post.service";
import { useDispatch } from "react-redux";
import { setOpenModalPost } from "@/store/homeSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { showError, showSuccess } from "../Toast/toastHelpers";
import SpinnerDots from "../Spinner/SipnnerDots";
import Close from "@/styles/icons/Close";
import type { PostDescription } from "@/types/editor";
import { createDocumentFromText } from "@/utils/editorContent";
import styles from "./modalCreate.module.scss";

const ModalCreatePost = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const QueryClient = useQueryClient();
    const [namePost, setNamePost] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const isDisabled = !namePost.trim() || !description.trim();

    //escribir mutación y consulta al end point
    const { mutateAsync: createPostMutation, isPending } = useMutation({
        mutationFn: (body: { title: string; description: PostDescription }) =>
            createPost(body),
        mutationKey: ["createPost"],
        onSuccess: async () => {
            showSuccess(t("home.toast.created"));
            setNamePost("");
            dispatch(setOpenModalPost(false));
            await QueryClient.refetchQueries({
                queryKey: ["getAllPost"],
            });
        },
        onError: (error: any) => {
            showError(t("home.toast.createPostError"));
            dispatch(setOpenModalPost(false));
        },
    });
    const handlerCreatePost = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const body = {
                title: namePost.trim(),
                description: createDocumentFromText(description),
            };
            await createPostMutation(body);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.overlay}>
            <form
                className={styles.containerModalCreate}
                onSubmit={handlerCreatePost}
            >
                <div className={styles.containerTop}>
                    <h2>{t("home.modals.createPost.title")}</h2>
                    <button
                        type="button"
                        onClick={() => dispatch(setOpenModalPost(false))}
                    >
                        <Close width="24" height="24" color="white" />
                    </button>
                </div>
                <div className={styles.containerInput}>
                    <label>{t("home.modals.fields.name")}</label>
                    <input
                        type="text"
                        title={t("home.modals.fields.postName")}
                        placeholder={t("home.modals.placeholders.name")}
                        className={styles.inputs}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNamePost(e.target.value)
                        }
                        value={namePost}
                    />
                    <label>{t("home.modals.fields.description")}</label>
                    <input
                        type="text"
                        title={t("home.modals.fields.postName")}
                        placeholder={t("home.modals.placeholders.description")}
                        className={styles.inputs}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setDescription(e.target.value)
                        }
                        value={description}
                    />
                </div>
                <div className={styles.containerButtons}>
                    <button
                        type="button"
                        title={t("home.modals.actions.cancel")}
                        onClick={() => dispatch(setOpenModalPost(false))}
                    >
                        {t("home.modals.actions.cancel")}
                    </button>
                    <button
                        type="submit"
                        className={styles.btnCreate}
                        disabled={isPending || isDisabled}
                    >
                        {!isPending ? t("home.modals.actions.createPost") : (<SpinnerDots color="#FFFFFF" size={6} />)}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalCreatePost;
