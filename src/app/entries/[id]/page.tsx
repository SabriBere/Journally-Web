import React from "react";
import Breadcrumbs from "@/commons/Navbar/Breadcrumbs";
import ToolBar from "@/commons/Navbar/ToolBar";
import Editor from "@/commons/Editor/Editor";
import styles from "./oneEntry.module.scss";

const CollectionDetail = () => {
    return (
        <div className={styles.contanerEditor}>
            <Breadcrumbs />
            <Editor />
            <ToolBar />
        </div>
    );
};

export default CollectionDetail;
