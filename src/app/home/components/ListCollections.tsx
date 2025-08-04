"use client";
import { Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { allCollection } from "@/services/collection.service";

const ListCollections = () => {
    const {
        data,
        isLoading,
        isError,
        isSuccess,
        fetchNextPage,
        // isFetchingNextPage,
        // hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["getAllCollections"],
        queryFn: ({ pageParam = 1 }) =>
            allCollection({ page: pageParam, id: 6 }),
        getNextPageParam: (lastPage: any, pages: any) => {
            //revisar si recibe toda la data necesaria de la API
            if (pages?.length - 1 < lastPage?.limit) {
                return pages.length;
            }
            return undefined;
        },
        initialPageParam: 1,
    });

    // console.log(data?.pages[0]?.collectionList);

    return (
        <div>
            {isSuccess && (
                <ul>
                    {/* Modularizar a cards */}
                    {/* {data?.pages?.map((page: any, pageIndex: number) => (
                        <Fragment key={pageIndex}>
                            {page?.collectionList.map((oneCollection: any) => (
                                <li key={oneCollection?.collection_id}>
                                    {oneCollection?.title}
                                </li>
                            ))}
                        </Fragment>
                    ))} */}
                </ul>
            )}
        </div>
    );
};

export default ListCollections;
