import React from "react";
import { signOut } from "next-auth/react";
import styles from "./buttonLogin.module.scss";

const ButtonLogOut = () => {
    //logica de nexta-auth para cerrar la sesión
    const logOut = async () => {
        await signOut();
    };
    
    return (
        <button className={styles.buttonLogOut} onClick={logOut}>
            <p>Cerrar sesión</p>
        </button>
    );
};

export default ButtonLogOut;
