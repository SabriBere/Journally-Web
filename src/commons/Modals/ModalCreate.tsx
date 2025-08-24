import React from "react";
import styles from "./modalCreate.module.scss";

//Sirve para crear colecciones/post
//que al presionar enter se envie (si completo todos los campos)
const ModalCreate = () => {
    return (
        <form>
            <label></label>
            <input type="text" />
            <label></label>
            <input type="text" />
        </form>
    );
};

export default ModalCreate;
