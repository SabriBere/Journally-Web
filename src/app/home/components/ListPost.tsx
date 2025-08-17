"use client";
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
import styles from "./listPost.module.scss";

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
                    return pages.length + 1;
                }
                return undefined;
            },
            initialPageParam: 1,
        });

    const flatPost =
        data?.pages?.flatMap((page: any) => page?.userPost ?? []) ?? [];

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
                            <InfiniteScroll fetchNextPage={fetchNextPage}>
                                {flatPost?.map((onePost: any, i: number) => (
                                    <Link
                                        href={`/collection/${onePost.post_id}`}
                                        key={`col-${String(onePost.post_id)}-${i}`}
                                    >
                                        <Card data={onePost} index={i} />
                                    </Link>
                                ))}
                            </InfiniteScroll>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ListPost;
