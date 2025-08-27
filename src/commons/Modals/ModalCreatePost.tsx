import React, { ChangeEvent, useState } from "react";
import { createPost } from "@/services/post.service";
import { useDispatch } from "react-redux";
import { setOpenModalPost } from "@/store/userSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../Toast/toastHelpers";
import Close from "@/styles/icons/Close";
import styles from "./modalCreate.module.scss";

const ModalCreatePost = () => {
    const dispatch = useDispatch();
    const QueryClient = useQueryClient();
    const [namePost, setNamePost] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    //escribir mutación y consulta al end point
    const { mutateAsync: createPostMutation } = useMutation({
        mutationFn: (body: { title: string; description: string }) =>
            createPost(body),
        mutationKey: ["createPost"],
        onSuccess: async () => {
            showSuccess("Creado correctamente");
            setNamePost("");
            dispatch(setOpenModalPost(false));
            await QueryClient.refetchQueries({
                queryKey: ["getAllPost"],
            });
        },
        onError: (error: any) => {
            showError("Error al crear el post");
            dispatch(setOpenModalPost(false));
        },
    });
    const handlerCreatePost = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const body = {
                title: namePost.trim(),
                description: description,
            };
            await createPostMutation(body);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.overlay}>
            <form className={styles.containerModalCreate}>
                <div className={styles.containerTop}>
                    <h2>Crear un post</h2>
                    <button onClick={() => dispatch(setOpenModalPost(false))}>
                        <Close width="24" height="24" color="white" />
                    </button>
                </div>
                <div className={styles.containerInput}>
                    <label>Nombre</label>
                    <input
                        type="text"
                        title="nombre post"
                        placeholder="Ingrese un nombre"
                        className={styles.inputs}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setNamePost(e.target.value)
                        }
                        value={namePost}
                    />
                    <label>Descripción</label>
                    <input
                        type="text"
                        title="nombre post"
                        placeholder="Ingrese una descripción"
                        className={styles.inputs}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setDescription(e.target.value)
                        }
                        value={description}
                    />
                </div>
                <div className={styles.containerButtons}>
                    <button
                        onClick={handlerCreatePost}
                        className={styles.btnCreate}
                    >
                        Crear
                    </button>
                    <button
                        type="button"
                        title="Cancelar"
                        onClick={() => dispatch(setOpenModalPost(false))}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalCreatePost;
