"use client";
import React, { useState } from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setEditText, setSavePost } from "@/store/editSlice";
import TooltipWrapper from "../Tooltip/Tooltip";
import Copy from "@/styles/icons/Copy";
import Edit from "@/styles/icons/Edit";
import Save from "@/styles/icons/Save";
import Delete from "@/styles/icons/Delete";
import styles from "./toolbar.module.scss";
import Plus from "@/styles/icons/Plus";

const ToolBar = () => {
    const dispatch = useDispatch();
    const editText = useSelector((state: RootState) => state.edit.editText);
    const savePost = useSelector((state: RootState) => state.edit.savePost);
    const [showTools, setShowTools] = useState(false);
    const toggle = () => setShowTools((p) => !p);

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
            action: () => dispatch(setSavePost(!savePost)),
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
