"use client";
import React, { useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ModalCreateCollection from "../Modals/ModalCreateCollection";
import ModalCreatePost from "../Modals/ModalCreatePost";
import Plus from "@/styles/icons/Plus";
import styles from "./notEntries.module.scss";

const NotEntries = ({ title }: { title: string }) => {
    const tabs = useSelector((state: RootState) => state.tabs.tabs);
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
    const [openModalPost, setOpenModalPost] = useState<boolean>(false);

    return (
        <>
            <div className={styles.containerEmptyState}>
                <h2>{title}</h2>
                <button onClick={() => setOpenModalCreate(true)}>
                    <Plus color="white" width="24" height="24" />
                </button>
            </div>
            {openModalCreate && tabs === "collections" && (
                <ModalCreateCollection setModal={setOpenModalCreate} />
            )}
            {openModalPost && tabs === "post" && <ModalCreatePost />}
        </>
    );
};

export default NotEntries;
