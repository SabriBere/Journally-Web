"use client";
import React from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalCollection, setOpenModalPost } from "@/store/userSlice";
import ModalCreateCollection from "../Modals/ModalCreateCollection";
import ModalCreatePost from "../Modals/ModalCreatePost";
import Plus from "@/styles/icons/Plus";
import styles from "./notEntries.module.scss";

const NotEntries = ({ title }: { title: string }) => {
    const dispatch = useDispatch();
    const tabs = useSelector((state: RootState) => state.tabs.tabs);
    const openModalCollection = useSelector(
        (state: RootState) => state.user.openModalCollection
    );
    const openModalPost = useSelector(
        (state: RootState) => state.user.openModalPost
    );

    return (
        <>
            <div className={styles.containerEmptyState}>
                <h2>{title}</h2>
                {tabs === "collections" ? (
                    <button onClick={() => dispatch(setOpenModalCollection(true))}>
                        <Plus color="white" width="24" height="24" />
                    </button>
                ) : (
                    <button onClick={() => dispatch(setOpenModalPost(true))}>
                        <Plus color="white" width="24" height="24" />
                    </button>
                )}
            </div>
            {openModalCollection && tabs === "collections" && (
                <ModalCreateCollection />
            )}
            {openModalPost && tabs === "post" && (
                <ModalCreatePost  />
            )}
        </>
    );
};

export default NotEntries;
