"use client";
import React from "react";
import styles from "./error.module.scss";

const Error = () => {
    return (
        <div className={styles.containerError}>
            <h2>Ooop... Surgió un problema</h2>
        </div>
    );
};

export default Error;
