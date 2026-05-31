"use client";
import React from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalCollection, setOpenModalPost } from "@/store/homeSlice";
import { useQuery } from "@tanstack/react-query";
import { getAllPost } from "@/services/post.service";
import { allCollection } from "@/services/collection.service";
import ModalCreateCollection from "../Modals/ModalCreateCollection";
import ModalCreatePost from "../Modals/ModalCreatePost";
import TooltipWrapper from "../Tooltip/Tooltip";
import Plus from "@/styles/icons/Plus";
import styles from "./buttonCreate.module.scss";

const ButtonCreate = () => {
    const dispatch = useDispatch();
    const tabs = useSelector((state: RootState) => state.tabs.tabs);
    const openModalCollection = useSelector(
        (state: RootState) => state.home.openModalCollection
    );
    const openModalPost = useSelector(
        (state: RootState) => state.home.openModalPost
    );

    const collectionsCall = useQuery({
        queryKey: ["getAllCollections", { page: 1 }],
        queryFn: () => allCollection({ page: 1 }),
        enabled: tabs === "collections",
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const postsCall = useQuery({
        queryKey: ["getAllPost", { page: 1 }],
        queryFn: () => getAllPost({ page: 1 }),
        enabled: tabs === "post",
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    const collections = collectionsCall.data?.collectionList?.length;
    const posts = postsCall.data?.userPost?.length;
    const showCollectionButton =
        tabs === "collections" &&
        !collectionsCall.isLoading &&
        Boolean(collections);
    const showPostButton =
        tabs === "post" && !postsCall.isLoading && Boolean(posts);

    return (
        <>
            {showCollectionButton && (
                <TooltipWrapper content="Crear colección">
                    <button
                        className={styles.containerButton}
                        onClick={() => dispatch(setOpenModalCollection(true))}
                    >
                        <Plus color="white" width="24" height="24" />
                    </button>
                </TooltipWrapper>
            )}
            {showPostButton && (
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
