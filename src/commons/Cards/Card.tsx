"use client";
import React from "react";
import TooltipWrapper from "@/commons/Tooltip/Tooltip";
import Trash from "@/styles/icons/Trash";
import Edit from "@/styles/icons/Edit";
import styles from "./card.module.scss";

//Hacer componente generico, reutilizable
interface CardData {
    data: any;
}

const Card = ({ data }: CardData) => {
    return (
        <div className={styles.containerCard}>
            <div className={styles.topCard}>
                <h3>{data?.title}</h3>
                <TooltipWrapper content={"Editar"}>
                    <i>
                        <Edit width="20" height="20" color="white" />
                    </i>
                </TooltipWrapper>
            </div>
            <TooltipWrapper content={"Eliminar"}>
                <i className={styles.bottomCard}>
                    <Trash width="20" height="20" color="white" />
                </i>
            </TooltipWrapper>
        </div>
    );
};

export default Card;
