"use client";
import React, { useState } from "react";
import styles from "./inputEmail.module.scss";

//En principio esto es para el login
const InputEmail = () => {
    //Mover al hook de email
    const [inputEmail, setInputEmail] = useState<string>("");
    // const [isValid, setIsValid] = useState<boolean>(false);
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handlerChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputEmail(value);
        // setIsValid(emailRegex.test(value));
    };

    return (
        <div>
            <input
                type="email"
                placeholder="Email"
                onChange={handlerChangeEmail}
                value={inputEmail}
            />
        </div>
    );
};

export default InputEmail;
