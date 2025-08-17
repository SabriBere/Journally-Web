"use client";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CardsSkeletonGrid } from "@/commons/Skeletons/SkeletonList";
import { getAllPost } from "@/services/post.service";
import Link from "next/link";
import Card from "@/commons/Cards/Card";
import InfiniteScroll from "@/commons/InfinteScroll/InfiniteScroll";
import ServerDown from "@/commons/Ilustrations/ServerDown";
import MyUniverse from "@/commons/Ilustrations/MyUniverse";
import SpaceExploration from "@/commons/Ilustrations/SpaceExploration";
import NotEntries from "@/commons/EmptyStates/NotEntries";
import Error from "@/commons/EmptyStates/Error";
import styles from "./listCollection.module.scss";

const ListPost = () => {
    const tabs = useSelector((state: RootState) => state.tabs.tabs);

    const searchTextPost = useSelector(
        (state: RootState) => state.user.searchTextPost
    );

    const { data, isLoading, isError, isSuccess, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ["getAllPost", { search: searchTextPost }],
            queryFn: ({ pageParam = 1 }) =>
                getAllPost({ page: pageParam, searchText: searchTextPost }),
            getNextPageParam: (lastPage: any, pages: any) => {
                if (pages?.length - 1 < lastPage?.totalPages) {
                    return pages.length;
                }
                return undefined;
            },
            initialPageParam: 1,
        });

    return (
        <>
            {tabs === "post" && (
                <div className={styles.containerMain}>
                    <div className={styles.containerImage}>
                        {isError ? (
                            <ServerDown />
                        ) : isSuccess &&
                          data?.pages[0]?.userPost?.legth === 0 ? (
                            <MyUniverse />
                        ) : (
                            <SpaceExploration />
                        )}
                    </div>

                    {isError ? (
                        <div className={styles.containerEmpty}>
                            <Error />
                        </div>
                    ) : isSuccess && data?.pages[0]?.userPost?.length === 0 ? (
                        <div className={styles.containerEmpty}>
                            <NotEntries title="Crear una nueva entrada" />
                        </div>
                    ) : null}

                    {/* Skeletons */}
                    {isLoading && <CardsSkeletonGrid count={9} />}

                    {isSuccess && (
                        <div className={styles.containerList}>
                            {/* <InfiniteScroll fetchNextPage={fetchNextPage}> */}
                            {data?.pages?.map(
                                (page: any, pageIndex: number) => (
                                    <Fragment key={pageIndex}>
                                        {page?.userPost?.map(
                                            (onePost: any, index: number) => {
                                                const globalIndex =
                                                    pageIndex *
                                                        page?.onePost?.length +
                                                    index;
                                                return (
                                                    <Link
                                                        href={`/entries/${onePost?.post_id}`}
                                                        key={onePost?.post_id}
                                                    >
                                                        <Card
                                                            data={onePost}
                                                            index={globalIndex}
                                                        />
                                                    </Link>
                                                );
                                            }
                                        )}
                                    </Fragment>
                                )
                            )}
                            {/* </InfiniteScroll> */}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ListPost;
