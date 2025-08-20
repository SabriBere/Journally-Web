"use client";
import React, { ChangeEvent, useState } from "react";
import {
    useMutation,
    useQueryClient,
    QueryClient,
} from "@tanstack/react-query";
import { updateCollection } from "@/services/collection.service";
import Close from "@/styles/icons/Close";
import Check from "@/styles/icons/Check";
import styles from "./modalEditName.module.scss";
import { Handlee } from "next/font/google";

interface ModalProps {
    id: number;
    isOpen: boolean;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
    color: string;
}

//Reutilizar para titulo de colecciones/posteos
const ModalEditName = ({ id, isOpen, setClose, color }: ModalProps) => {
    const QueryClient = useQueryClient();
    const [newName, setNewName] = useState<string>("");
    // console.log(newName);
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
            onSuccess: () => {
                //invalidar la query si se ejecuta más de una vez
                //toast con el mensaje de editado correctamente
                //cerrar modal
                //refech del listado (usar query con el nombre de la querykey del listado)
            },
            onError: () => {
                //llamar al toast con el mensaje de error
                //Cerrar el modal
            },
        });

    const handlerEdit = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!newName.trim()) return console.log("Ingrese un nombre");

        try {
            const body = {
                title: newName,
                collectionId: id,
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
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
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
                type="button"
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
                onClick={(e) => {
                    e.stopPropagation();
                    setClose(false);
                }}
                disabled={isPendingEdit}
            >
                <Close color={"#FFFFFF"} width="20" height="20" />
            </button>
        </div>
    );
};

export default ModalEditName;
