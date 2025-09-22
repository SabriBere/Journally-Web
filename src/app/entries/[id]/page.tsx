import React from "react";
import ToolBar from "@/commons/Navbar/ToolBar";
import styles from "./oneEntry.module.scss";
import Breadcrumbs from "@/commons/Navbar/Breadcrumbs";

const CollectionDetail = () => {
    return (
        <div className={styles.contanerEditor}>
            <Breadcrumbs />
            <ToolBar />
        </div>
    );
};

export default CollectionDetail;
