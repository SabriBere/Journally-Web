"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setEditText, setSavePost } from "@/store/editSlice";
import { showSuccess, showError } from "../Toast/toastHelpers";
import { updatePost } from "@/services/post.service";
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
    const postId = Number(id);
    const dispatch = useDispatch();
    const QueryClient = useQueryClient();
    const editText = useSelector((state: RootState) => state.edit.editText);
    const newText = useSelector((state: RootState) => state.edit.newText);
    const savePost = useSelector((state: RootState) => state.edit.savePost);
    const [showTools, setShowTools] = useState(false);
    const toggle = () => setShowTools((p) => !p);

    const {
        mutateAsync: updatePostMutation,
        isPending: isPendingEdit,
        isError: isErrorEdit,
    } = useMutation({
        mutationFn: ({ body, postId }: { body: PostBody; postId: number }) =>
            updatePost(body, postId),
        mutationKey: ["editPost", postId],
        onSuccess: async () => {
            showSuccess("Guardado correctamente 🎉");
            await QueryClient.invalidateQueries({ queryKey: ["onePost", postId] });
        },
        onError: (error: any) => {
            showError("Error al editar nombre");
        },
    });

    const handlerEditPost = async () => {
        if (!newText?.trim()) {
            showError("No hay cambios para guardar");
            return;
        }
        const body = {
            title: "",
            description: newText,
        };
        await updatePostMutation({ body, postId });

        dispatch(setEditText(false));
        dispatch(setSavePost(false));
    };

    const options = [
        {
            id: 0,
            icon: <Delete color="white" width="24" height="24" />,
            name: "Eliminar",
            color: "#e74828",
            action: () => console.log("Eliminar"),
        },
        {
            id: 1,
            icon: <Copy color="white" width="24" height="24" />,
            name: "Copiar",
            color: "#f4a534",
            action: () => console.log("Copiar"),
        },
        {
            id: 2,
            icon: <Save color="white" width="24" height="24" />,
            name: "Guardar",
            color: "#11796f",
            action: async () => {
                if (isPendingEdit) return;
                try {
                    await handlerEditPost();
                } catch (error) {
                    console.error(error);
                }
            },
        },
        {
            id: 3,
            icon: <Edit color="white" width="24" height="24" />,
            name: "Editar",
            color: "#0d1e2b",
            action: () => dispatch(setEditText(!editText)),
        },
        {
            id: 4,
            icon: <Plus color="white" width="24" height="24" />,
            name: "Herramientas",
            color: "#e74828",
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
                            className={styles.buttonEdit}
                            style={{ backgroundColor: opt.color }}
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
