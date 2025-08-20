"use client";
import React, { useState } from "react";
import Close from "@/styles/icons/Close";
import Check from "@/styles/icons/Check";
import styles from "./modalEditName.module.scss";

interface ModalProps {
    id: number;
    isOpen: boolean;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
    color: string;
}

//Reutilizar para titulo de colecciones/posteos
const ModalEditName = ({ id, isOpen, setClose, color }: ModalProps) => {
    const [newName, setNewName] = useState<string>("");
    //Mutación con react query
    const handlerEdit = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setClose((prev: boolean) => !prev);
    };

    return (
        <div
            className={styles.containerModalName}
            style={{ backgroundColor: color }}
        >
            {/* Mostrar en el placeholder el nombre */}
            <input
                className={styles.inputName}
                placeholder="Ingrese nuevo nombre"
                type="text"
            />
            <button className={styles.buttonEdit} onClick={handlerEdit}>
                <Check color={"#FFFFFF"} width="20" height="20" />
            </button>
            <button className={styles.buttonEdit} onClick={handlerEdit}>
                <Close color={"#FFFFFF"} width="20" height="20" />
            </button>
        </div>
    );
};

export default ModalEditName;
