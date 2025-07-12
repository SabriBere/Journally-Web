"use client";
import React, { useState } from "react";
import styles from "./inputPassword.module.scss";

const InputPassword = () => {
    //Mover al hook de password
    const [inputPassword, setInputPass] = useState<string>("");
    // const [isValidPass, setIsValidPass] = useState<boolean>(false);
    // const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputPass(value);
        // setIsValidPass(passRegex.test(value));
    };

    return (
        <div>
            <input
                type="password"
                placeholder="Contraseña"
                onChange={handleChangePass}
                value={inputPassword}
            />
        </div>
    );
};

export default InputPassword;
