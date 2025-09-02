"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setInputEmail } from "@/store/userSlice";
import styles from "./inputEmail.module.scss";

//En principio esto es para el login
const InputEmail = () => {
    //Mover al hook de email
    const inputEmail = useSelector((state: RootState) => state.user.email);
    const dispatch = useDispatch();
    const [isValid, setIsValid] = useState<boolean>(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handlerChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value: any = e.target.value;
        dispatch(setInputEmail(value));
        setIsValid(emailRegex.test(value));
    };

    return (
        <div className={styles.containerInputEmail}>
            <label>Email</label>
            <input
                className={styles.input}
                type="email"
                placeholder="usuario@email.com"
                onChange={handlerChangeEmail}
                value={inputEmail}
                autoFocus
            />
        </div>
    );
};

export default InputEmail;
