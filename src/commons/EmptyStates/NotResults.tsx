"use client";
import React from "react";
import styles from "./notResults.module.scss";

const NotResults = ({ title }: { title: string }) => {
    return (
        <div className={styles.containerEmptyStateResults}>
            <h2>{title}</h2>
        </div>
    );
};

export default NotResults;
