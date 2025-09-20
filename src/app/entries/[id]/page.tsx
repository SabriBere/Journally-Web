import React from "react";
import TitleSection from "@/commons/Title/TitleSection";
import ToolBar from "@/commons/Navbar/ToolBar";
import styles from './oneEntry.module.scss'

const CollectionDetail = () => {
    return (
        <div className={styles.contanerEditor}>
            <TitleSection title={"Detalle de entrada"} />
            <ToolBar />
        </div>
    );
};

export default CollectionDetail;
