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

    const handlerEdit = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!newName.trim()) return console.log("Ingrese un nombre");
        try {
            const body = {
                title: newName,
                collectionId: id?.collection_id,
            };
            await editNameMutation(body);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={styles.containerModalName}
            style={{ backgroundColor: color }}
            onClick={(e: React.MouseEvent) => {
                e.stopPropagation(), e.preventDefault();
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
                <Check color={"#FFFFFF"} width="20" height="20" />
            </button>
            <button
                type="button"
                title="Cancelar"
                className={styles.buttonEdit}
                // onClick={(e) => {
                //     // e.stopPropagation();
                //     setClose(false);
                // }}
                disabled={isPendingEdit}
            >
                <Close color={"#FFFFFF"} width="20" height="20" />
            </button>
        </div>
    );
};

export default ModalEditName;
