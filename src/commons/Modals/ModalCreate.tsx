import React, { useState } from "react";
import Close from "@/styles/icons/Close";
import styles from "./modalCreate.module.scss";

interface ModalProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
//Sirve para crear colecciones/post
//que al presionar enter se envie (si completo todos los campos)
const ModalCreate = ({ setModal }: ModalProps) => {
    const [nameCollection, setNameCollection] = useState<boolean>(false);
    //cuando lo crea, llamar a la query que corresponda

    const handlerCreate = async () => {
        setModal(false);
    };
    return (
        <div className={styles.overlay}>
            <form className={styles.containerModalCreate}>
                <div className={styles.containerTop}>
                    <h2>Crear una colección</h2>
                    <button onClick={() => setModal(false)}>
                        <Close width="24" height="24" color="white" />
                    </button>
                </div>
                <div className={styles.containerInput}>
                    <label>Nombre</label>
                    <input
                        type="text"
                        title="Crear"
                        placeholder="Ingrese un nombre"
                        className={styles.inputs}
                    />
                </div>
                <div className={styles.containerButtons}>
                    <button onClick={handlerCreate}>Crear</button>
                    <button
                        type="submit"
                        title="Cancelar"
                        onClick={() => setModal(false)}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalCreate;
