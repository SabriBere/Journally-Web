"use client";
import React from "react";
import { signOut } from "next-auth/react";
import styles from "./buttonLogOut.module.scss";

interface ButtonLogOutProps {
    className?: string;
    stacked?: boolean;
    onSelect?: () => void;
}

const ButtonLogOut = ({
    className = "",
    stacked = false,
    onSelect,
}: ButtonLogOutProps) => {
    const buttonClassName = [
        styles.buttonLogOut,
        stacked ? styles.stacked : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const logOut = async () => {
        onSelect?.();
        await signOut({ callbackUrl: "/login", redirect: true });
    };

    return (
        <button className={buttonClassName} type="button" onClick={logOut}>
            Cerrar sesión
        </button>
    );
};

export default ButtonLogOut;
