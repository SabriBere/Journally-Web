"use client";
import { Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { allCollection } from "@/services/collection.service";
import Card from "@/commons/Cards/Card";
import styles from "./listCollection.module.scss";
import Link from "next/link";
import InfiniteScroll from "@/commons/InfinteScroll/InfiniteScroll";

const ListCollections = () => {
    const {
        data,
        isLoading,
        isError,
        isSuccess,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["getAllCollections"],
        queryFn: ({ pageParam = 1 }) =>
            allCollection({ page: pageParam, id: 6 }),
        getNextPageParam: (lastPage: any, pages: any) => {
            if (pages?.length - 1 < lastPage?.totalPages) {
                return pages.length;
            }
            return undefined;
        },
        initialPageParam: 1,
    });

    return (
        <div>
            {/* Hacer empty state */}
            {/* Hacer skeleton */}
            {isSuccess && (
                <div className={styles.containerList}>
                    <InfiniteScroll fetchNextPage={fetchNextPage}>
                        {data?.pages?.map((page: any, pageIndex: number) => (
                            <Fragment key={pageIndex}>
                                {page?.collectionList?.map(
                                    (oneCollection: any, idx: number) => {
                                        const globalIndex =
                                            pageIndex *
                                                page.collectionList.length +
                                            idx;
                                        return (
                                            <Link
                                                href={`/home/${oneCollection?.collection_id}`}
                                                key={
                                                    oneCollection?.collection_id
                                                }
                                            >
                                                <Card
                                                    data={oneCollection}
                                                    index={globalIndex}
                                                />
                                            </Link>
                                        );
                                    }
                                )}
                            </Fragment>
                        ))}
                    </InfiniteScroll>
                </div>
            )}
        </div>
    );
};

export default ListCollections;
