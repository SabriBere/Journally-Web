"use client";
import React, { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCollection } from "@/services/collection.service";
import Close from "@/styles/icons/Close";
import Check from "@/styles/icons/Check";
import styles from "./modalEditName.module.scss";

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
    //captura de valores
    const body = {
        title: newName,
        collectionId: id?.collection_id,
    };

    const handlerInputName = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setNewName(e.target.value);
    };
    //Mutación con react query
    const { mutateAsync: editNameMutation, isPending: isPendingEdit } =
        useMutation({
            mutationFn: (body: {
                title: string;
                collectionId: string | number;
            }) => updateCollection(body),
            mutationKey: ["editNameCollection"],
            onSuccess: async () => {
                //toast con el mensaje de editado correctamente
                setClose(false);
                await QueryClient.refetchQueries({
                    queryKey: ["getAllCollections"],
                });
            },
            onError: () => {
                //llamar al toast con el mensaje de error
                setClose(false);
            },
        });

    const handlerEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!newName.trim()) return console.log("Ingrese un nombre"); //mostrar toast
        try {
            await editNameMutation(body);
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
                    e.stopPropagation(); // evita que el Link ancestro navegue
                }
            }}
        >
            <input
                className={styles.inputName}
                placeholder="Ingrese nuevo nombre"
                type="text"
                onChange={handlerInputName}
                value={newName}
                disabled={isPendingEdit}
            />
            <button
                type="submit"
                title="Guardar"
                className={styles.buttonEdit}
                onClick={handlerEdit}
                disabled={isPendingEdit}
            >
                <Check color={"#11796f"} width="20" height="20" />
            </button>
            <button
                type="button"
                title="Cancelar"
                className={styles.buttonEdit}
                onClick={(e) => {
                    setClose(false);
                }}
                disabled={isPendingEdit}
            >
                <Close color={"#0d1e2b"} width="20" height="20" />
            </button>
        </form>
    );
};

export default ModalEditName;
