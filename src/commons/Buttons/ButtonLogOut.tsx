"use client";
import React from "react";
import { signOut } from "next-auth/react";
import styles from "./buttonLogOut.module.scss";
import LogOut from "@/styles/icons/LogOut";

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
        <button
            type="button"
            className={buttonClassName}
            aria-label="Cerrar sesión"
            title="Cerrar sesión"
            onClick={logOut}
        >
            <LogOut width="24" height="24" color="white" />
            <span className={styles.label}>Cerrar sesión</span>
        </button>
    );
};

export default ButtonLogOut;
