"use client";
import React, { useState } from "react";
import Eye from "@/styles/icons/Eye";
import EyeClose from "@/styles/icons/EyeClose";
import styles from "./inputPassword.module.scss";

const InputPassword = () => {
    //Mover al hook de password
    const [inputPassword, setInputPass] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    // const [isValidPass, setIsValidPass] = useState<boolean>(false);
    // const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const toggleShowPassword = () => setShowPassword((prev) => !prev);

    const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputPass(value);
        // setIsValidPass(passRegex.test(value));
    };

    return (
        <div className={styles.containerInputPassword}>
            <label>Contraseña</label>
            <span className={styles.inputPass}>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    onChange={handleChangePass}
                    value={inputPassword}
                />
                {/* Agregar tooltip de mostrar/ocultar */}
                <button onClick={toggleShowPassword}>
                    {showPassword ? (
                        <Eye width="24" height="24" color="#4a4a4a" />
                    ) : (
                        <EyeClose width="24" height="24" color="#4a4a4a" />
                    )}
                </button>
            </span>
        </div>
    );
};

export default InputPassword;
