"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/services/post.service";
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
        retry: false,
    });
    //Colocar skeletons de carga
    //Colocar empty state para cuando falla la api

    // console.log(entry);
    //fecha de conversión de fecha y hora
    const converDate = (date: string | undefined) => {
        const recibeDate = date;
        const splitDate: any = recibeDate?.split("T");

        const options: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };

        const formattedDate = new Intl.DateTimeFormat("es", options).format(
            new Date(splitDate[0])
        );
        return formattedDate;
    };

    return (
        <div className={styles.containerPaper}>
            {isSuccess && (
                <div>
                    <h1>{entry?.title}</h1>
                    <p>{`${converDate(entry?.created_at)}`}</p>
                </div>
            )}
            {/* <div>
                <textarea name="message" rows="5" cols="30" placeholder="Enter your message here..."></textarea>
            </div> */}
        </div>
    );
};

export default Editor;
