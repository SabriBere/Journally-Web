"use client";
import React, { useState } from "react";
import styles from "./tabs.module.scss";

const Tabs = () => {
    //estados
    const [tabs, setTabs] = useState<"post" | "collections">("post");

    console.log(tabs)
    return (
        <div className={styles.containerTabs}>
            <button
                className={`${styles.tab} ${tabs === "post" ? styles.selectedTab : ""}`}
                onClick={() => setTabs("post")}
            >
                Entradas
            </button>
            <button
                className={`${styles.tab} ${tabs === "collections" ? styles.selectedTab : ""}`}
                onClick={() => setTabs("collections")}
            >
                Colecciones
            </button>
        </div>
    );
};

export default Tabs;
