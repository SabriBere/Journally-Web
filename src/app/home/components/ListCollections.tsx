"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CardsSkeletonGrid } from "@/commons/Skeletons/SkeletonList";
import { allCollection } from "@/services/collection.service";
import Link from "next/link";
import Card from "@/commons/Cards/Card";
import InfiniteScroll from "@/commons/InfinteScroll/InfiniteScroll";
import NotEntries from "@/commons/EmptyStates/NotEntries";
import NotResults from "@/commons/EmptyStates/NotResults";
import Error from "@/commons/EmptyStates/Error";
import SpaceExploration from "@/commons/Ilustrations/SpaceExploration";
import MyUniverse from "@/commons/Ilustrations/MyUniverse";
import ServerDown from "@/commons/Ilustrations/ServerDown";
import styles from "./listCollection.module.scss";

const ListCollections = () => {
    const tabs = useSelector((state: RootState) => state.tabs.tabs);
    const searchTextCollection = useSelector(
        (state: RootState) => state.user.searchTextCollection
    );
    // console.log(searchTextCollection);
    const { data, isLoading, isError, isSuccess, fetchNextPage } =
        useInfiniteQuery({
            queryKey: ["getAllCollections", { search: searchTextCollection }],
            queryFn: ({ pageParam = 1 }) =>
                allCollection({
                    page: pageParam,
                    searchText: searchTextCollection,
                }),
            getNextPageParam: (lastPage: any, pages: any) => {
                if (pages?.length - 1 < lastPage?.totalPages) {
                    return pages.length + 1;
                }
                return undefined;
            },
            initialPageParam: 1,
        });

    const flatCollection =
        data?.pages?.flatMap((page: any) => page?.collectionList ?? []) ?? [];

    // console.log(data?.pages[0]?.collectionList);

    return (
        <>
            {tabs === "collections" && (
                <div className={styles.containerMain}>
                    {/* Imagenes de fondo --> Se puede mover a un common de fondos*/}
                    <div className={styles.containerImage}>
                        {isError ? (
                            <ServerDown />
                        ) : isSuccess &&
                          data?.pages[0]?.collectionList?.length === 0 ? (
                            <MyUniverse />
                        ) : (
                            <SpaceExploration />
                        )}
                    </div>

                    {isError ? (
                        <div className={styles.containerEmpty}>
                            <Error />
                        </div>
                    ) : isSuccess &&
                      data?.pages[0]?.collectionList?.length === 0 &&
                      searchTextCollection === "" ? (
                        <div className={styles.containerEmpty}>
                            <NotEntries title="Crear una nueva colección" />
                        </div>
                    ) : isSuccess &&
                      searchTextCollection !== "" &&
                      data?.pages[0]?.collectionList?.length === 0 ? (
                        <div className={styles.containerEmpty}>
                            <NotResults title="No se encontraron resultados" />
                        </div>
                    ) : null}

                    {/* Skeletons */}
                    {isLoading && <CardsSkeletonGrid count={9} />}

                    {/* Listado de cards */}
                    {isSuccess && (
                        <div className={styles.containerList}>
                            <InfiniteScroll fetchNextPage={fetchNextPage}>
                                {flatCollection?.map((one: any, i: number) => (
                                    <Link
                                        href={`/collection/${one.collection_id}`}
                                        key={`col-${String(one.collection_id)}-${i}`}
                                    >
                                        <Card data={one} index={i} />
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

export default ListCollections;
