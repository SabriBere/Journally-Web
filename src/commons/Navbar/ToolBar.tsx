"use client";
import React, { useState } from "react";
import Copy from "@/styles/icons/Copy";
import Edit from "@/styles/icons/Edit";
import Save from "@/styles/icons/Save";
import Delete from "@/styles/icons/Delete";
import TooltipWrapper from "../Tooltip/Tooltip";
import styles from "./toolbar.module.scss";

const ToolBar = () => {
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
            action: () => console.log("Guardar"),
        },
        {
            id: 3,
            icon: <Edit color="white" width="24" height="24" />,
            name: "Editar",
            color: "#0d1e2b",
            action: toggle,
        },
    ];

    const edit = options.find((ops) => ops.id === 3)!;
    const tools = options.filter((ops) => ops.id !== 3);

    return (
        <div className={styles.containerToolBar}>
            {showTools &&
                tools.map((opt) => (
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
