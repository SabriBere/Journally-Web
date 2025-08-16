"use client";
import React from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import styles from "./inputSearch.module.scss";
import Search from "@/styles/icons/Search";

const InputSearch = () => {
    const dispatch = useDispatch();
    //el nombre del label y placeholder cambien según el tab seleccionado
    const tabs = useSelector((state: RootState) => state.tabs.tabs);

    //capturar el valor del input y enviar a los listados para filtrar
    const searchTextPost = useSelector(
        (state: RootState) => state.user.searchTextPost
    );
    const searchTextCollection = useSelector(
        (state: RootState) => state.user.searchTextCollection
    );

    return (
        <div className={styles.containerInputSearch}>
            <label>
                {tabs === "collections" ? "Buscar colección" : "Buscar posteo"}
            </label>
            <span className={styles.input}>
                <Search width="20" height="20" />
                <input
                    placeholder={
                        tabs === "collections"
                            ? "Ingresar colección"
                            : "Ingresar posteo"
                    }
                ></input>
            </span>
        </div>
    );
};

export default InputSearch;
