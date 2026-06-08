"use client";
import React, { ChangeEvent } from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTextCollection, setSearchTextPost } from "@/store/homeSlice";
import { useTranslation } from "react-i18next";
import Close from "@/styles/icons/Close";
import Search from "@/styles/icons/Search";
import styles from "./inputSearch.module.scss";

const InputSearch = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    //el nombre del label y placeholder cambien según el tab seleccionado
    const tabs = useSelector((state: RootState) => state.tabs.tabs);

    //capturar el valor del input y enviar a los listados para filtrar
    const searchTextPost = useSelector(
        (state: RootState) => state.home.searchTextPost
    );
    const searchTextCollection = useSelector(
        (state: RootState) => state.home.searchTextCollection
    );

    const isCollections = tabs === "collections";
    const placeholder = isCollections
        ? t("home.search.collection")
        : t("home.search.post");
    const value = isCollections ? searchTextCollection : searchTextPost;

    const handlerInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (tabs === "collections") {
            dispatch(setSearchTextCollection(value));
            return;
        }

        dispatch(setSearchTextPost(value));
    };

    const clearInput = () => {
        if (tabs === "collections") {
            dispatch(setSearchTextCollection(""));
            return;
        }

        dispatch(setSearchTextPost(""));
    };

    return (
        <div className={styles.containerInputSearch}>
            <span className={styles.input}>
                <Search color="#015443" width="24" height="24" />
                <input
                    placeholder={placeholder}
                    onChange={handlerInputSearch}
                    value={value}
                ></input>
                {value && (
                    <button
                        className={styles.clearBtn}
                        onClick={clearInput}
                        type="button"
                    >
                        <Close color="#e74828" width="24" height="24" />
                    </button>
                )}
            </span>
        </div>
    );
};

export default InputSearch;
