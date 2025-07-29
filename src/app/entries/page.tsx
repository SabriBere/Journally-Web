"use client"; //hasta que modularice en componentes más pequeños
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPost } from "@/services/post.service";
import styles from "./entries.module.scss";

const Entries = () => {
    //cambiar por use infinite query
    const {
        data,
        isLoading,
        isError,
        isSuccess,
        fetchNextPage,
        // isFetchingNextPage,
        // hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["dossiersInModal"],
        queryFn: ({ pageParam = 1 }) => getAllPost({ page: pageParam }),
        getNextPageParam: (lastPage: any, pages: any) => {
            if (pages?.length - 1 < lastPage?.limit) {
                return pages.length;
            }
            return undefined;
        },
        initialPageParam: 1,
    });

    console.log(data?.pages[0]?.userPost)

    return (
        <div className={styles.containerEntries}>
            <h1>Entries</h1>
            {/* <h1>{`${data?.userPost}`}</h1> */}
        </div>
    );
};

export default Entries;
