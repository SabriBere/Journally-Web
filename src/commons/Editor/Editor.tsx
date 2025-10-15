"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/services/post.service";
import { converDate } from "@/utils/formatDate";
import Error from "@/commons/EmptyStates/Error";
import SkeletonEditor from "@/commons/Skeletons/SkeletonEditor";
import styles from "./editor.module.scss";

const Editor = () => {
    const { id } = useParams();
    const convertId = Number(id);

    const {
        data: entry,
        isSuccess,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["onePost", convertId],
        queryFn: () => getPostById(convertId as number),
        enabled: !!convertId,
        // retry: false,
    });
    //Colocar skeletons de carga
    //Colocar empty state para cuando falla la api

    return (
        <>
            {isLoading && <SkeletonEditor />}
            {isError && (
                <div className={styles.containerError}>
                    <Error />
                </div>
            )}
            {isSuccess && (
                <div className={styles.containerPaper}>
                    <div className={styles.header}>
                        <h1>{entry?.title}</h1>
                        <p>{`${converDate(entry?.created_at)}`}</p>
                    </div>
                    <div className={styles.text}>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industrys standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </p>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industrys standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing
                            software like Aldus PageMaker including versions of
                            Lorem Ipsum.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Editor;
