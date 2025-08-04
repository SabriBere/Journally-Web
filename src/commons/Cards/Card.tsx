import React from "react";
import Trash from "@/styles/icons/Trash";
import Edit from "@/styles/icons/Edit";
import styles from "./card.module.scss";

//Hacer componente generico, reutilizable
interface CardData {
    data: any;
}

const Card = ({ data }: CardData) => {
    return (
        <div className={styles.containerCard} key={data?.collection_id}>
            <div className={styles.topCard}>
                <h3>{data?.title}</h3>
                <i>
                    <Edit width="20" height="20" color="white" />
                </i>
            </div>
            <i className={styles.bottomCard}>
                <Trash width="20" height="20" color="white" />
            </i>
        </div>
    );
};

export default Card;
