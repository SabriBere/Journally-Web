"use client";
import React, { ChangeEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../Toast/toastHelpers";
import { createCollection } from "@/services/collection.service";
import Close from "@/styles/icons/Close";
import styles from "./modalCreate.module.scss";

interface ModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
//Sirve para crear colecciones/post
//que al presionar enter se envie (si completo todos los campos)
const ModalCreate = ({ setModal }: ModalProps) => {
    const QueryClient = useQueryClient();
    const [nameCollection, setNameCollection] = useState<string>("");

    //cuando lo crea, llamar a la query que corresponda
    const { mutateAsync: createCollectionMutation } = useMutation({
        mutationFn: (body: {
            collectionName: string;
            title: string;
        }) => createCollection(body),
        mutationKey: ["createCollection"],
        onSuccess: async () => {
            showSuccess("Creado correctamente");
            setModal(false);
            await QueryClient.refetchQueries({
                queryKey: ["getAllCollections"],
            });
        },
        onError: (error: any) => {
            console.log(error);
            showError("Error al crear colección");
            setModal(false);
        },
    });

    const handlerCreate = async (e: React.FormEvent) => {
        try {
            e.preventDefault(); 
            const body = {
                collectionName: nameCollection.trim(),
                title: nameCollection,
            };
            await createCollectionMutation(body);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.overlay}>
            <form className={styles.containerModalCreate}>
                <div className={styles.containerTop}>
                    <h2>Crear una colección</h2>
                    <button onClick={() => setModal(false)}>
                        <Close width="24" height="24" color="white" />
                    </button>
                </div>
                <div className={styles.containerInput}>
                    <label>Nombre</label>
                    <input
                        type="text"
                        title="Crear"
                        placeholder="Ingrese un nombre"
                        className={styles.inputs}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNameCollection(e.target.value)
                        }
                        value={nameCollection}
                    />
                </div>
                <div className={styles.containerButtons}>
                    <button
                        onClick={handlerCreate}
                        className={styles.btnCreate}
                    >
                        Crear
                    </button>
                    <button
                        type="submit"
                        title="Cancelar"
                        onClick={() => setModal(false)}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalCreate;
