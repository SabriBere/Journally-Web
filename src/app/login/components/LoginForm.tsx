"use client";
import React from "react";
import InputEmail from "@/commons/Inputs/InputEmail";
import InputPassword from "@/commons/Inputs/InputPassword";
import Voyager from "@/commons/Ilustrations/Voyager";
import styles from "./loginForm.module.scss";

const LoginForm = () => {
    return (
        <div className={styles.containerLoginForm}>
            <h1>Iniciar sesión</h1>
            <div className={styles.loginCard}>
                <div className={styles.voyagerBg}>
                    <Voyager width="150%" height="150%" />
                </div>
                <InputEmail />
                <InputPassword />
                {/* <button type="submit">Iniciar sesión</button> */}
            </div>
        </div>
    );
};

export default LoginForm;
