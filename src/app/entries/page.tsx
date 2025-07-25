"use client"; //hasta que modularice en componentes más pequeños
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllPost } from "@/services/post.service";
import styles from "./entries.module.scss";

const Entries = () => {
    //cambiar por use infinite query
    const { data } = useQuery({
        queryKey: ["handShake"],
        queryFn: () => getAllPost(),
    });
    return (
        <div className={styles.containerEntries}>
            <h1>{`${data?.userPost}`}</h1>
        </div>
    );
};

export default Entries;
