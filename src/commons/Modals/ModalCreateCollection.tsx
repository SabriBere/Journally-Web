"use client";
import React, { ChangeEvent, useState } from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalCollection } from "@/store/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../Toast/toastHelpers";
import { createCollection } from "@/services/collection.service";
import Close from "@/styles/icons/Close";
import styles from "./modalCreate.module.scss";

//Sirve para crear colecciones/post
//que al presionar enter se envie (si completo todos los campos)
const ModalCreateCollection = () => {
    const dispatch = useDispatch();
    const QueryClient = useQueryClient();
    const [nameCollection, setNameCollection] = useState<string>("");
    const openModalCollection = useSelector(
        (state: RootState) => state.user.openModalCollection
    );

    //cuando lo crea, llamar a la query que corresponda
    const { mutateAsync: createCollectionMutation } = useMutation({
        mutationFn: (body: { collectionName: string; title: string }) =>
            createCollection(body),
        mutationKey: ["createCollection"],
        onSuccess: async () => {
            showSuccess("Creado correctamente");
            setNameCollection("");
            dispatch(setOpenModalCollection(false));
            await QueryClient.refetchQueries({
                queryKey: ["getAllCollections"],
            });
        },
        onError: (error: any) => {
            showError("Error al crear colección");
            dispatch(setOpenModalCollection(false));
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
        <>
            {openModalCollection && (
                <div className={styles.overlay}>
                    <form className={styles.containerModalCreate}>
                        <div className={styles.containerTop}>
                            <h2>Crear una colección</h2>
                            <button
                                onClick={() =>
                                    dispatch(setOpenModalCollection(false))
                                }
                            >
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
                                type="button"
                                title="Cancelar"
                                onClick={() =>
                                    dispatch(setOpenModalCollection(false))
                                }
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

export default ModalCreateCollection;
