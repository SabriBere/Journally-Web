"use client"
import React from "react";
import { signOut } from "next-auth/react";
import styles from "./buttonLogin.module.scss";

const ButtonLogOut = () => {
    const logOut = async () => {
        await signOut({ redirect: true });
    };

    return (
        <button className={styles.buttonLogOut} onClick={logOut}>
            <p>Cerrar sesión</p>
        </button>
    );
};

export default ButtonLogOut;
