import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { showError, showSuccess } from "../Toast/toastHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { deleteCollection } from "@/services/collection.service";
import { deletePost } from "@/services/post.service";
import Check from "@/styles/icons/Check";
import Close from "@/styles/icons/Close";
import styles from "./ModalDelete.module.scss";
import TooltipWrapper from "../Tooltip/Tooltip";

//Model a un common de types
interface ModalProps {
    id: any;
    isOpen: boolean;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
    color: string;
}

const ModalDelete = ({ id, isOpen, setClose, color }: ModalProps) => {
    const { t } = useTranslation();
    // console.log(id);
    const QueryClient = useQueryClient();
    const tabs = useSelector((state: RootState) => state.tabs.tabs);
    const textModal =
        tabs === "collections"
            ? t("home.modals.delete.collection")
            : t("home.modals.delete.post");

    const {
        mutateAsync: deleteCollectionMutation,
        isPending: isPendingCollection,
    } = useMutation({
        mutationFn: (collectionId: number | string) =>
            deleteCollection(collectionId),
        mutationKey: ["deleteCollection"],
        onSuccess: async () => {
            showSuccess(t("home.toast.deleted"));
            setClose(false);
            await QueryClient.refetchQueries({
                queryKey: ["getAllCollections"],
            });
        },
        onError: async () => {
            showError(t("home.toast.deleteError"));
            setClose(false);
        },
    });

    const { mutateAsync: deletePostMutation, isPending: isPendingPost } =
        useMutation({
            mutationFn: (postId: number | string) => deletePost(postId),
            mutationKey: ["deletePost"],
            onSuccess: async () => {
                showSuccess(t("home.toast.deleted"));
                setClose(false);
                await QueryClient.refetchQueries({
                    queryKey: ["getAllPost"],
                });
            },
            onError: async () => {
                showError(t("home.toast.deleteError"));
                setClose(false);
            },
        });

    const handlerDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            tabs === "collections"
                ? await deleteCollectionMutation(id?.collection_id)
                : await deletePostMutation(id?.post_id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={styles.containerModalDelete}
            style={{ backgroundColor: color }}
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation(), e.preventDefault();
            }}
        >
            <div className={styles.miniModal} aria-hidden="true">
                <p>{textModal}</p>
            </div>
            <TooltipWrapper content={t("home.actions.delete")}>
                <button type="button" onClick={handlerDelete} disabled={isPendingPost || isPendingCollection}>
                    <Check color={"#11796f"} width="20" height="20" />
                </button>
            </TooltipWrapper>
            <TooltipWrapper content={t("home.modals.actions.cancel")}>
                <button type="button" onClick={() => setClose(false)} disabled={isPendingPost || isPendingCollection}>
                    <Close color={"#0d1e2b"} width="20" height="20" />
                </button>
            </TooltipWrapper>
        </div>
    );
};

export default ModalDelete;
