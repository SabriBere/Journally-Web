"use client";
import React from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalCollection, setOpenModalPost } from "@/store/userSlice";
import ModalCreateCollection from "../Modals/ModalCreateCollection";
import ModalCreatePost from "../Modals/ModalCreatePost";
import Plus from "@/styles/icons/Plus";
import styles from "./buttonCreate.module.scss";
import TooltipWrapper from "../Tooltip/Tooltip";

const ButtonCreate = () => {
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
            {tabs === "collections" ? (
                <TooltipWrapper content={"Crear colección"}>
                    <button
                        className={styles.containerButton}
                        onClick={() => dispatch(setOpenModalCollection(true))}
                    >
                        <Plus color="white" width="24" height="24" />
                    </button>
                </TooltipWrapper>
            ) : (
                <TooltipWrapper content={"Crear entrada"}>
                    <button
                        className={styles.containerButton}
                        onClick={() => dispatch(setOpenModalPost(true))}
                    >
                        <Plus color="white" width="24" height="24" />
                    </button>
                </TooltipWrapper>
            )}
            {openModalCollection && tabs === "collections" && (
                <ModalCreateCollection />
            )}
            {openModalPost && tabs === "post" && <ModalCreatePost />}
        </>
    );
};

export default ButtonCreate;
