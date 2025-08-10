"use client";
import { Fragment } from "react";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { allCollection } from "@/services/collection.service";
import Card from "@/commons/Cards/Card";
import InfiniteScroll from "@/commons/InfinteScroll/InfiniteScroll";
import NotEntries from "@/commons/EmptyStates/NotEntries";
import styles from "./listCollection.module.scss";
import SpaceExploration from "@/commons/Ilustrations/SpaceExploration";
import MyUniverse from "@/commons/Ilustrations/MyUniverse";

const ListCollections = () => {
    // const { data, isLoading, isError, isSuccess, fetchNextPage } =
    //     useInfiniteQuery({
    //         queryKey: ["getAllCollections"],
    //         queryFn: ({ pageParam = 1 }) =>
    //             allCollection({ page: pageParam, id: 6 }),
    //         getNextPageParam: (lastPage: any, pages: any) => {
    //             if (pages?.length - 1 < lastPage?.totalPages) {
    //                 return pages.length;
    //             }
    //             return undefined;
    //         },
    //         initialPageParam: 1,
    //     });

    // const firstPage = data?.pages?.[0];
    // const isEmpty = isSuccess && (firstPage?.collectionList?.length ?? 0) === 0;
    const isEmpty = true;

    return (
        <div className={styles.containerMain}>
            {/* Imagenes de fondo */}
            <div className={styles.containerImage} aria-hidden>
                {isEmpty ? (
                    <MyUniverse width="750" height="750" />
                ) : (
                    <SpaceExploration width="800" height="800" />
                )}
            </div>

            {/* Empty state */}
            {/* {isSuccess && data?.pages[0].length === 0 && (
                <div className={styles.containerEmpty}>
                    <NotEntries />
                </div>
            )} */}

            <div className={styles.containerEmpty}>
                <NotEntries />
            </div>

            {/* Skeletons */}

            {/* Listado de cards */}
            {/* {isSuccess && (
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
            )} */}
        </div>
    );
};

export default ListCollections;
