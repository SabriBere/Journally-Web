"use client";
import React from "react";
import styles from "./modalEditName.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ModalProps {
    id: number;
    isOpen: boolean;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

//Reutilizar para titulo de colecciones/posteos
const ModalEditName = ({ id, isOpen, setClose }: ModalProps) => {
    return (
        <div className={styles.containerModalName}>
            <div className={styles.containerInputs}>
                {/* Mostrar en el placeholder el nombre */}
                <input
                    className={styles.inputName}
                    placeholder="Ingrese nuevo nombre"
                    type="text"
                />
                <button
                    className={styles.buttonEdit}
                    onClick={() => setClose(false)}
                >
                    Editar
                </button>
            </div>
        </div>
    );
};

export default ModalEditName;
