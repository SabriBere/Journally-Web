import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { showError, showSuccess } from "../Toast/toastHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCollection } from "@/services/collection.service";
import { deletePost } from "@/services/post.service";
import Check from "@/styles/icons/Check";
import Close from "@/styles/icons/Close";
import styles from "./ModalDelete.module.scss";

//Model a un common de types
interface ModalProps {
    id: any;
    isOpen: boolean;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
    color: string;
}

const ModalDelete = ({ id, isOpen, setClose, color }: ModalProps) => {
    console.log(id);
    const QueryClient = useQueryClient();
    const tabs = useSelector((state: RootState) => state.tabs.tabs);
    const textModal =
        tabs === "collections"
            ? "¿Desea eliminar esta colección?"
            : "¿Desea eliminar este post?";

    const {
        mutateAsync: deleteCollectionMutation,
        isPending: isPendingCollection,
    } = useMutation({
        mutationFn: (collectionId: number | string) =>
            deleteCollection(collectionId),
        mutationKey: ["deleteCollection"],
        onSuccess: async () => {
            showSuccess("Eliminado correctamente 🎉");
            setClose(false);
            await QueryClient.refetchQueries({
                queryKey: ["getAllCollections"],
            });
        },
        onError: async () => {
            showError(`Error al eliminar collección`);
            setClose(false);
        },
    });

    const { mutateAsync: deletePostMutation, isPending: isPendingPost } =
        useMutation({
            mutationFn: (postId: number | string) => deletePost(postId),
            mutationKey: ["deletePost"],
            onSuccess: async () => {
                showSuccess("Eliminado correctamente 🎉");
                setClose(false);
                await QueryClient.refetchQueries({
                    queryKey: ["getAllCollections"],
                });
            },
            onError: async () => {
                showError(`Error al eliminar collección`);
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
            <div className={styles.miniModal}>
                <p>{textModal}</p>
            </div>
            <button type="button" onClick={handlerDelete}>
                <Check color={"#11796f"} width="20" height="20" />
            </button>
            <button type="button" onClick={() => setClose(false)}>
                <Close color={"#0d1e2b"} width="20" height="20" />
            </button>
        </div>
    );
};

export default ModalDelete;
