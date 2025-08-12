"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import styles from "./listCollection.module.scss";

const ListPost = () => {
    const tabs = useSelector((state: RootState) => state.tabs.tabs);

    return (
        <>
            {tabs === "post" && (
                <div className={styles.containerMain}>
                    <h1>Hola...</h1>
                </div>
            )}
        </>
    );
};

export default ListPost;
