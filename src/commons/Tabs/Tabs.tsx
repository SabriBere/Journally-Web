"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTabs } from "@/store/tabsSlice";
import styles from "./tabs.module.scss";

const Tabs = () => {
    const dispatch = useDispatch();
    const tabs = useSelector((state: RootState) => state.tabs.tabs);

    return (
        <div className={styles.containerTabs}>
            <button
                className={`${styles.tab} ${tabs === "post" ? styles.selectedTab : styles.inactiveTab}`}
                onClick={() => dispatch(setTabs("post"))}
            >
                Entradas
            </button>
            <button
                className={`${styles.tab} ${tabs === "collections" ? styles.selectedTab : styles.inactiveTab}`}
                onClick={() => dispatch(setTabs("collections"))}
            >
                Colecciones
            </button>
        </div>
    );
};

export default Tabs;
