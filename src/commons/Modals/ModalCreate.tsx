import React from "react";
import styles from "./modalCreate.module.scss";

interface ModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

//Sirve para crear colecciones/post
//que al presionar enter se envie (si completo todos los campos)
const ModalCreate = ({ setModal }: ModalProps) => {
    //cuando lo crea, llamar a la query que corresponda
    return (
        <div className={styles.overlay}>
            <form className={styles.containerModalCreate}>
                <label></label>
                <input type="text" />
                <label></label>
                <input type="text" />
            </form>
        </div>
    );
};

export default ModalCreate;
