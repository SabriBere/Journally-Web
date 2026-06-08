"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./error.module.scss";

const Error = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.containerError}>
            <h2>{t("home.empty.error")}</h2>
        </div>
    );
};

export default Error;
