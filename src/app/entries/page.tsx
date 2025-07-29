"use client"; //hasta que modularice en componentes más pequeños
import React, { Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPost } from "@/services/post.service";
import styles from "./entries.module.scss";

const Entries = () => {
    const {
        data,
        isLoading,
        isError,
        isSuccess,
        fetchNextPage,
        // isFetchingNextPage,
        // hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["getAllPost"],
        queryFn: ({ pageParam = 1 }) => getAllPost({ page: pageParam }),
        getNextPageParam: (lastPage: any, pages: any) => {
            //revisar si recibe toda la data necesaria de la API
            if (pages?.length - 1 < lastPage?.limit) {
                return pages.length;
            }
            return undefined;
        },
        initialPageParam: 1,
    });

    // console.log(data?.pages[0]?.userPost);

    return (
        <div className={styles.containerEntries}>
            <h1>Entries</h1>
            {isSuccess && (
                <ul>
                    {data?.pages?.map((page: any, pageIndex: number) => (
                        <Fragment key={pageIndex}>
                            {page?.userPost.map((onePost: any) => (
                                <li key={onePost?.post_id}>{onePost?.title}</li>
                            ))}
                        </Fragment>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Entries;
