"use client"
import React from "react";
import { signOut } from "next-auth/react";
import styles from "./buttonLogin.module.scss";

interface ButtonLogOutProps {
    className?: string;
}

const ButtonLogOut = ({ className = "" }: ButtonLogOutProps) => {
    const logOut = async () => {
        await signOut({ redirect: true });
    };

    return (
        <button
            className={[styles.buttonLogOut, className].filter(Boolean).join(" ")}
            onClick={logOut}
        >
            <p>Cerrar sesión</p>
        </button>
    );
};

export default ButtonLogOut;
