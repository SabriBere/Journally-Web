"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "@/services/post.service";
import styles from "./editor.module.scss";

const Editor = () => {
    const { id } = useParams();
    const convertId = Number(id);

    const { data: entry } = useQuery({
        queryKey: ["onePost", convertId],
        queryFn: () => getPostById(convertId as number),
        enabled: !!convertId,
        retry: false,
    });
    //Colocar skeletons de carga
    //Colocar empty state para cuando falla la api

    // console.log(entry);
    //fecha de conversión de fecha y hora
    return (
        <div className={styles.containerPaper}>
            <div>
                <h1>{entry?.title}</h1>
                <p>{entry?.created_at}</p>
            </div>
            {/* <div>
                <textarea name="message" rows="5" cols="30" placeholder="Enter your message here..."></textarea>
            </div> */}
        </div>
    );
};

export default Editor;
