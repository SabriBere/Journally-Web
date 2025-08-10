import React from "react";
import Plus from "@/styles/icons/Plus";
import styles from "./notEntries.module.scss";

const NotEntries = () => {
    return (
        <div className={styles.containerEmptyState}>
            <h2>Crear una nueva entrada</h2>
            <button>
                <Plus color="white" width="24" height="24" />
            </button>
        </div>
    );
};

export default NotEntries;
