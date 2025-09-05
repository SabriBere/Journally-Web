"use client";
import React, { ChangeEvent, useState } from "react";
import { showError, showSuccess } from "../Toast/toastHelpers";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCollection } from "@/services/collection.service";
import { updatePost } from "@/services/post.service";
import Close from "@/styles/icons/Close";
import Check from "@/styles/icons/Check";
import styles from "./modalEditName.module.scss";
import TooltipWrapper from "../Tooltip/Tooltip";

interface ModalProps {
    id: any;
    isOpen: boolean;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
    color: string;
}

//Reutilizar para titulo de colecciones/posteos
const ModalEditName = ({ id, isOpen, setClose, color }: ModalProps) => {
    const QueryClient = useQueryClient();
    const [newName, setNewName] = useState<string>("");
    // console.log(newName);
    const tabs = useSelector((state: RootState) => state.tabs.tabs);
    //captura de valores
    const body: any =
        tabs === "collections"
            ? {
                  title: newName,
                  collectionId: id?.collection_id,
              }
            : {
                  title: newName,
                  description: id?.description,
              };

    const handlerInputName = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setNewName(e.target.value);
    };
    //Mutación con react query para colecciones
    const {
        mutateAsync: editCollectionNameMutation,
        isPending: isPendingEditCollection,
    } = useMutation({
        mutationFn: (body: { title: string; collectionId: string | number }) =>
            updateCollection(body),
        mutationKey: ["editNameCollection"],
        onSuccess: async () => {
            showSuccess("Guardado correctamente 🎉");
            setClose(false);
            await QueryClient.refetchQueries({
                queryKey: ["getAllCollections"],
            });
        },
        onError: (error: any) => {
            //llamar al toast con el mensaje de error
            showError("Error al editar nombre");
            setClose(false);
        },
    });

    //Mutación con react query para posteos
    const { mutateAsync: editPostNameMutation, isPending: isPendingEditPost } =
        useMutation({
            mutationFn: ({
                body,
                postId,
            }: {
                body: { title?: string; description: string };
                postId: string | number;
            }) =>
                updatePost(
                    {
                        title: newName,
                        description: id?.description,
                    },
                    id?.post_id
                ),
            mutationKey: ["editNamePost"],
            onSuccess: async () => {
                // toast.success("Post actualizado");
                showSuccess("Guardado correctamente 🎉");
                //ajustar para cuando sale bien
                setClose(false);
                await QueryClient.refetchQueries({
                    queryKey: ["getAllPost"],
                });
            },
            onError: (error: any) => {
                //llamar al toast con el mensaje de error
                showError("Error al editar nombre");
                setClose(false);
            },
        });

    const handlerEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!newName.trim()) return console.log("Ingrese un nombre"); //mostrar toast
        try {
            //según el tab ejeutar una mutación u otra
            tabs === "collections"
                ? await editCollectionNameMutation(body)
                : await editPostNameMutation(body, id?.post_id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form
            className={styles.containerModalName}
            style={{ backgroundColor: color }}
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation(), e.preventDefault();
            }}
            onSubmit={handlerEdit}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }}
        >
            <input
                className={styles.inputName}
                placeholder="Ingrese nuevo nombre"
                type="text"
                onChange={handlerInputName}
                value={newName}
                disabled={isPendingEditCollection || isPendingEditPost}
            />
            <TooltipWrapper content={"Guardar"}>
                <button
                    type="submit"
                    title="Guardar"
                    className={styles.buttonEdit}
                    onClick={handlerEdit}
                    disabled={isPendingEditCollection || isPendingEditPost}
                >
                    <Check color={"#11796f"} width="20" height="20" />
                </button>
            </TooltipWrapper>
            <TooltipWrapper content={"Cancelar"}>
                <button
                    type="button"
                    title="Cancelar"
                    className={styles.buttonEdit}
                    onClick={(e) => {
                        setClose(false);
                    }}
                    disabled={isPendingEditCollection || isPendingEditPost}
                >
                    <Close color={"#0d1e2b"} width="20" height="20" />
                </button>
            </TooltipWrapper>
        </form>
    );
};

export default ModalEditName;
