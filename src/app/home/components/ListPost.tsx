"use client";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllPost } from "@/services/post.service";
import Link from "next/link";
import Card from "@/commons/Cards/Card";
import InfiniteScroll from "@/commons/InfinteScroll/InfiniteScroll";
import styles from "./listCollection.module.scss";

const ListPost = () => {
    const tabs = useSelector((state: RootState) => state.tabs.tabs);
    const { data, isLoading, isError, isSuccess, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ["getAllPost"],
            queryFn: ({ pageParam = 1 }) => getAllPost({ page: pageParam }),
            getNextPageParam: (lastPage: any, pages: any) => {
                if (pages?.length - 1 < lastPage?.totalPages) {
                    return pages.length;
                }
                return undefined;
            },
            initialPageParam: 1,
        });

    // console.log(data);

    return (
        <>
            {tabs === "post" && (
                <div className={styles.containerMain}>
                    {isSuccess && (
                        <div className={styles.containerList}>
                            <InfiniteScroll fetchNextPage={fetchNextPage}>
                                {data?.pages?.map(
                                    (page: any, pageIndex: number) => (
                                        <Fragment key={pageIndex}>
                                            {page?.userPost?.map(
                                                (
                                                    onePost: any,
                                                    index: number
                                                ) => {
                                                    const globalIndex =
                                                        pageIndex *
                                                            page?.onePost
                                                                ?.length +
                                                        index;
                                                    return (
                                                        <Link
                                                            href={`/home/`}
                                                            key={
                                                                onePost?.post_id
                                                            }
                                                        >
                                                            <Card
                                                                data={onePost}
                                                                index={
                                                                    globalIndex
                                                                }
                                                            />
                                                        </Link>
                                                    );
                                                }
                                            )}
                                        </Fragment>
                                    )
                                )}
                            </InfiniteScroll>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ListPost;
