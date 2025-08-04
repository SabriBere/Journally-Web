import React from "react";
import TitleSection from "@/commons/Title/TitleSection";
import styles from "./entries.module.scss";

const Entries = () => {
    return (
        <div className={styles.containerEntries}>
            <TitleSection title={"Entrada"} />
        </div>
    );
};

export default Entries;
