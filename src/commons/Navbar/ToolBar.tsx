import React from "react";
import Edit from "@/styles/icons/Edit";
import styles from "./toolbar.module.scss";

const ToolBar = () => {
    const options = [
        {
            icon: <Edit color="white" width="24" height="24"/>,
            name: "Eliminar",
            color: "#e74828",
        },
        {
            icon: <Edit color="white" width="24" height="24"/>,
            name: "Copiar",
            color: "#f4a534",
        },
        {
            icon: <Edit color="white" width="24" height="24"/>,
            name: "Guardar",
            color: "#11796f",
        },
        {
            icon: <Edit color="white" width="24" height="24"/>,
            name: "Editar",
            color: "#0d1e2b",
        },
    ];
    return (
        <div className={styles.containerToolBar}>
            {options.map((option, index) => (
                <button
                    key={index}
                    className={styles.buttonEdit}
                    style={{ backgroundColor: option.color }}
                    title={option.name}
                >
                    {option.icon}
                </button>
            ))}
        </div>
    );
};

export default ToolBar;
