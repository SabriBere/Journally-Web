"use client"
import React from "react";
// import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import styles from "./buttonLogin.module.scss";

const ButtonLogOut = () => {
    //logica de nexta-auth para cerrar la sesión
    // const router = useRouter();
    const logOut = async () => {
        await signOut({ redirect: true });
        // router.replace("/login");
    };

    return (
        <button className={styles.buttonLogOut} onClick={logOut}>
            <p>Cerrar sesión</p>
        </button>
    );
};

export default ButtonLogOut;
