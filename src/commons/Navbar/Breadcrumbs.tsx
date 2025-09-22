"use client";
import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/services/post.service";
import { collectionById } from "@/services/collection.service";
import styles from "./breadcrumbs.module.scss";

const Breadcrumbs = () => {
    const router = useRouter();
    const pathSegment = usePathname();
    const { id } = useParams();
    const convertId = Number(id);
    const isEntryRoute = pathSegment === `/entries/`;
    const isCollectionRoute = pathSegment === `/collection/`;

    //detalle de cualquier post
    const { data: postById } = useQuery({
        queryKey: ["oneEntry"],
        queryFn: () => getPostById(convertId),
        enabled: Boolean(convertId && isEntryRoute),
        retry: false,
    });

    //Detalle de una colección
    const { data: collectionData } = useQuery({
        queryKey: ["oneCollection"],
        queryFn: () => collectionById(convertId),
        enabled: Boolean(convertId && isCollectionRoute),
        retry: false,
    });

    const breadcrumbsList = [
        {
            nameOfLastPage: "Entradas",
            nameOfCurrentPage: `Detalle de entrada > ${postById?.title}`,
            condition: (pathSegment: string) =>
                pathSegment === `/entries/${id}`,
        },
        {
            nameOfLastPage: "Colecciones",
            nameOfCurrentPage: `${collectionData?.collection_name} > ${collectionData?.title}`,
            condition: (pathSegment: string) =>
                pathSegment === `/collection/${id}`,
        },
    ];

    const getCurrentBreadcrumb = () => {
        const currentConfig = breadcrumbsList.find((config) =>
            config.condition(pathSegment)
        );
        return currentConfig && <p>{currentConfig.nameOfCurrentPage}</p>;
    };

    const getLastPageName = (nameOfLastPage: string, index: number) => (
        <p
            key={index}
            className={styles.lastPage}
            onClick={() => router.back()}
        >
            {nameOfLastPage} <span className={styles.space}>{">"}</span>
        </p>
    );

    return (
        <div className={styles.containerBreads}>
            {breadcrumbsList.map((config, index) =>
                config.condition(pathSegment)
                    ? getLastPageName(config.nameOfLastPage, index)
                    : null
            )}
            {getCurrentBreadcrumb()}
        </div>
    );
};

export default Breadcrumbs;
