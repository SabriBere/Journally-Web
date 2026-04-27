import React from "react";
import Breadcrumbs from "@/commons/Navbar/Breadcrumbs";
import Tiptap from "@/commons/Editor/Tiptap";
import styles from "./oneEntry.module.scss";


const CollectionDetail = () => {
    return (
        <div className={styles.contanerEditor}>
            <Breadcrumbs />

            <div className={styles.contend}>
                <Tiptap />
                {/* Agregar paginado */}
            </div>
        </div>
    );
};

export default CollectionDetail;
