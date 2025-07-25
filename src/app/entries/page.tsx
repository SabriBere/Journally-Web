"use client"; //hasta que modularice en componentes más pequeños
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllEntries } from "@/services/post.service";
import styles from "./entries.module.scss";

const Entries = () => {
    const { data } = useQuery({
        queryKey: ["handShake"],
        queryFn: () => getAllEntries(),
    });
    return (
        <div className={styles.containerEntries}>
            <h1>{`${data}`}</h1>
        </div>
    );
};

export default Entries;
