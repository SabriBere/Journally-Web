"use client";
import React, { useState } from "react";
import ModalCreateCollection from "../Modals/ModalCreateCollection";
import Plus from "@/styles/icons/Plus";
import styles from "./notEntries.module.scss";

const NotEntries = ({ title }: { title: string }) => {
    const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);

    return (
        <>
            <div className={styles.containerEmptyState}>
                <h2>{title}</h2>
                <button onClick={() => setOpenModalCreate(true)}>
                    <Plus color="white" width="24" height="24" />
                </button>
            </div>
            {openModalCreate && (
                <ModalCreateCollection setModal={setOpenModalCreate} />
            )}
        </>
    );
};

export default NotEntries;
