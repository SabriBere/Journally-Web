"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setEditText, setSavePost } from "@/store/editSlice";
import { showSuccess, showError } from "../Toast/toastHelpers";
import { deletePost, updatePost } from "@/services/post.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TooltipWrapper from "../Tooltip/Tooltip";
import Copy from "@/styles/icons/Copy";
import Edit from "@/styles/icons/Edit";
import Save from "@/styles/icons/Save";
import Delete from "@/styles/icons/Delete";
import Plus from "@/styles/icons/Plus";
import styles from "./toolbar.module.scss";

type PostBody = { title: string; description: string };

const ToolBar = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const postId = Number(id);
    const dispatch = useDispatch();
    const QueryClient = useQueryClient();
    const editText = useSelector((state: RootState) => state.edit.editText);
    const newText = useSelector((state: RootState) => state.edit.newText);
    const currentDescription = useSelector(
        (s: RootState) => s.edit.currentDescription
    );
    const [showTools, setShowTools] = useState(false);
    const toggle = () => setShowTools((p) => !p);
    const normalize = (version?: string) =>
        (version ?? "").replace(/\s+/g, " ").trim();
    const isDirty = normalize(newText) !== normalize(currentDescription);

    const { mutateAsync: updatePostMutation, isPending: isPendingEdit } =
        useMutation({
            mutationFn: ({
                body,
                postId,
            }: {
                body: PostBody;
                postId: number;
            }) => updatePost(body, postId),
            mutationKey: ["editPost", postId],
            onSuccess: async () => {
                showSuccess("Guardado correctamente 🎉");
                await QueryClient.refetchQueries({
                    queryKey: ["onePost", postId],
                });
                await QueryClient.invalidateQueries({
                    queryKey: ["onePost", postId],
                });
            },
            onError: (error: any) => {
                if (!isDirty) {
                    showError("No hay cambios para guardar");
                    return;
                }
                showError("Error al editar");
            },
        });

    const canSave = editText && isDirty && !isPendingEdit;

    const handlerEditPost = async () => {
        if (!canSave) return;

        const body = {
            title: "",
            description: newText,
        };
        await updatePostMutation({ body, postId });

        dispatch(setEditText(false));
        dispatch(setSavePost(false));
    };

    const { mutateAsync: deletePostMutation } = useMutation({
        mutationFn: ({ postId }: { postId: number }) => deletePost(postId),
        mutationKey: ["deletePost", postId],
        onSuccess: async () => {
            showSuccess("Eliminado correctamente 🎉");
            await QueryClient.refetchQueries({
                queryKey: ["getAllPost"],
            });
            router.push("/home");
        },
        onError: (error: any) => {
            showError("Error al eliminar post");
        },
    });

    const handlerDeletePost = async () => {
        await deletePostMutation({ postId });
    };

    const handlerCopyPost = async () => {
        const textToCopy = editText ? newText : currentDescription;

        if (!textToCopy.trim()) {
            showError("No hay texto para copiar");
            return;
        }

        try {
            await navigator.clipboard.writeText(textToCopy);
            showSuccess("Texto copiado al portapapeles");
        } catch (error) {
            showError("No se pudo copiar el texto");
        }
    };

    const options = [
        {
            id: 0,
            icon: <Delete color="white" width="24" height="24" />,
            name: "Eliminar",
            color: "#e74828",
            action: () => {
                try {
                    handlerDeletePost();
                } catch (error) {
                    console.error(error);
                }
            },
        },
        {
            id: 1,
            icon: <Copy color="white" width="24" height="24" />,
            name: "Copiar",
            color: "#cb9441",
            action: handlerCopyPost,
        },
        {
            id: 2,
            icon: <Save color="white" width="24" height="24" />,
            name: "Guardar",
            color: canSave ? "#11796f" : "#a4a492",
            disabled: !canSave,
            action: handlerEditPost,
        },
        {
            id: 3,
            icon: <Edit color="white" width="24" height="24" />,
            name: "Editar",
            color: "#10434c",
            action: () => dispatch(setEditText(!editText)),
        },
        {
            id: 4,
            icon: <Plus color="white" width="24" height="24" />,
            name: "Herramientas",
            color: "#d2852e",
            action: toggle,
        },
    ];

    const edit = options.find((ops) => ops.id === 4)!;
    const tools = options.filter((ops) => ops.id !== 4);

    return (
        <div className={styles.containerToolBar}>
            {showTools &&
                tools?.map((opt) => (
                    <TooltipWrapper key={opt.id} content={opt.name}>
                        <button
                            className={`${styles.buttonEdit} ${styles.toolButton}`}
                            style={{ backgroundColor: opt.color }}
                            data-index={opt.id}
                            disabled={opt.disabled}
                            onClick={opt.action}
                        >
                            {opt.icon}
                        </button>
                    </TooltipWrapper>
                ))}

            <TooltipWrapper content={edit.name}>
                <button
                    key={edit.id}
                    className={styles.buttonEdit}
                    style={{ backgroundColor: edit.color }}
                    onClick={edit.action}
                    aria-expanded={showTools}
                >
                    {edit.icon}
                </button>
            </TooltipWrapper>
        </div>
    );
};

export default ToolBar;
