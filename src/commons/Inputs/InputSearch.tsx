"use client";
import React, { ChangeEvent } from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTextCollection, setSearchTextPost } from "@/store/userSlice";
import Close from "@/styles/icons/Close";
import Search from "@/styles/icons/Search";
import styles from "./inputSearch.module.scss";

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

    const isCollections = tabs === "collections";
    const placeholder = isCollections
        ? "Buscar colección"
        : "Buscar posteo";
    const value = isCollections ? searchTextCollection : searchTextPost;

    const handlerInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // console.log(value);
        tabs === "collections"
            ? dispatch(setSearchTextCollection(value))
            : dispatch(setSearchTextPost(value));
    };

    const clearInput = () => {
        tabs === "collections"
            ? dispatch(setSearchTextCollection(""))
            : dispatch(setSearchTextPost(""));
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
