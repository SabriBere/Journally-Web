"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTabs } from "@/store/tabsSlice";
import styles from "./tabs.module.scss";

interface TabsProps {
    className?: string;
    stacked?: boolean;
    onSelect?: () => void;
}

const Tabs = ({ className = "", stacked = false, onSelect }: TabsProps) => {
    const dispatch = useDispatch();
    const tabs = useSelector((state: RootState) => state.tabs.tabs);
    const containerClassName = [
        styles.containerTabs,
        stacked ? styles.stacked : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const handleTabChange = (value: "collections" | "post") => {
        dispatch(setTabs(value));
        onSelect?.();
    };

    return (
        <div className={containerClassName}>
            <button
                className={`${styles.tab} ${tabs === "collections" ? styles.selectedTab : styles.inactiveTab}`}
                onClick={() => handleTabChange("collections")}
            >
                Colecciones
            </button>
            <button
                className={`${styles.tab} ${tabs === "post" ? styles.selectedTab : styles.inactiveTab}`}
                onClick={() => handleTabChange("post")}
            >
                Entradas
            </button>
        </div>
    );
};

export default Tabs;
