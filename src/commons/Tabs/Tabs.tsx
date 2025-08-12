"use client";
import React, { useState } from "react";
import styles from "./tabs.module.scss";

const Tabs = () => {
    //estados --> mover redux
    const [tabs, setTabs] = useState<"post" | "collections">("post");

    return (
        <div className={styles.containerTabs}>
            <button
                className={`${styles.tab} ${tabs === "post" ? styles.selectedTab : styles.inactiveTab}`}
                onClick={() => setTabs("post")}
            >
                Entradas
            </button>
            <button
                className={`${styles.tab} ${tabs === "collections" ? styles.selectedTab : styles.inactiveTab}`}
                onClick={() => setTabs("collections")}
            >
                Colecciones
            </button>
        </div>
    );
};

export default Tabs;
