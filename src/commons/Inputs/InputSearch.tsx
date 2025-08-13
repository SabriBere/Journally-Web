"use client";
import React from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import styles from "./inputSearch.module.scss";

const InputSearch = () => {
    //el nombre del label y placeholder cambien según el tab seleccionado
    const tabs = useSelector((state: RootState) => state.tabs.tabs);

    return (
        <div className={styles.containerInputSearch}>
            <label>
                {tabs === "collections" ? "Buscar colección" : "Buscar posteo"}
            </label>
            <input placeholder="Buscar colección"></input>
        </div>
    );
};

export default InputSearch;
