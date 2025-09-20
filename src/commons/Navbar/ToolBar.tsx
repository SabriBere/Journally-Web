import React from "react";
import Copy from "@/styles/icons/Copy";
import Edit from "@/styles/icons/Edit";
import Delete from "@/styles/icons/Delete";
import TooltipWrapper from "../Tooltip/Tooltip";
import styles from "./toolbar.module.scss";

const ToolBar = () => {
    const options = [
        {
            icon: <Delete color="white" width="24" height="24" />,
            name: "Eliminar",
            color: "#e74828",
        },
        {
            icon: <Copy color="white" width="24" height="24" />,
            name: "Copiar",
            color: "#f4a534",
        },
        {
            icon: <Edit color="white" width="24" height="24" />,
            name: "Guardar",
            color: "#11796f",
        },
        {
            icon: <Edit color="white" width="24" height="24" />,
            name: "Editar",
            color: "#0d1e2b",
        },
    ];
    return (
        <div className={styles.containerToolBar}>
            {options.map((option, index) => (
                <TooltipWrapper key={index} content={`${option.name}`}>
                    <button
                        className={styles.buttonEdit}
                        style={{ backgroundColor: option.color }}
                    >
                        {option.icon}
                    </button>
                </TooltipWrapper>
            ))}
        </div>
    );
};

export default ToolBar;
