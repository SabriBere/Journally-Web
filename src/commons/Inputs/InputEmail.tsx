"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { setInputEmail } from "@/store/userSlice";
import { useTranslation } from "react-i18next";
import styles from "./inputEmail.module.scss";

//En principio esto es para el login
const InputEmail = () => {
    const { t } = useTranslation();
    //Mover al hook de email
    const inputEmail = useSelector((state: RootState) => state.user.email);
    const dispatch = useDispatch();

    const handlerChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setInputEmail(e.target.value));
    };

    return (
        <div className={styles.containerInputEmail}>
            <label>{t("auth.fields.email")}</label>
            <input
                className={styles.input}
                type="email"
                placeholder={t("auth.placeholders.email")}
                onChange={handlerChangeEmail}
                value={inputEmail}
                autoFocus
            />
        </div>
    );
};

export default InputEmail;
