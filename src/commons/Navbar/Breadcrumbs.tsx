"use client";
import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/services/post.service";
import { collectionById } from "@/services/collection.service";
import styles from "./breadcrumbs.module.scss";

const toNumber = (v: string | string[] | undefined) => {
    if (!v || Array.isArray(v)) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
};

const Breadcrumbs = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { id } = useParams<{ id: string }>();

    const convertId = toNumber(id);
    const isEntryRoute = pathname?.startsWith("/entries/");
    const isCollectionRoute = pathname?.startsWith("/collection/");

    // Detalle de post (solo si estoy en /entries/:id)
    const { data: postById } = useQuery({
        queryKey: ["oneEntry", convertId],
        queryFn: () => getPostById(convertId as number),
        enabled: Boolean(convertId && isEntryRoute),
        retry: false,
    });

    // Detalle de colección (solo si estoy en /collection/:id)
    const { data: collectionData } = useQuery({
        queryKey: ["oneCollection", convertId],
        queryFn: () => collectionById(convertId as number),
        enabled: Boolean(convertId && isCollectionRoute),
        retry: false,
    });

    const breadcrumbsList = [
        {
            nameOfLastPage: "Entradas",
            nameOfCurrentPage: `Detalle de entrada > ${postById?.title ?? ""}`,
            condition: (path: string) => path === `/entries/${id}`,
        },
        {
            nameOfLastPage: "Colecciones",
            nameOfCurrentPage: `${collectionData?.collection_name ?? ""} > ${collectionData?.title ?? ""}`,
            condition: (path: string) => path === `/collection/${id}`,
        },
    ];

    const current = breadcrumbsList.find((c) => c.condition(pathname));
    return (
        <div className={styles.containerBreads}>
            {current && (
                <p className={styles.lastPage} onClick={() => router.back()}>
                    {current.nameOfLastPage}{" "}
                    <span className={styles.space}>{">"}</span>
                </p>
            )}
            {current && <p>{current.nameOfCurrentPage}</p>}
        </div>
    );
};

export default Breadcrumbs;
