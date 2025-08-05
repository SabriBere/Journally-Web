// Card.tsx
"use client";
import React from "react";
import TooltipWrapper from "@/commons/Tooltip/Tooltip";
import Trash from "@/styles/icons/Trash";
import Edit from "@/styles/icons/Edit";
import styles from "./card.module.scss";

interface CardData {
    data: any;
    index?: number;
}

const colors = ["#e74828", "#d4844e", "#f4a124", "#6f4324"];

const Card = ({ data, index = 0 }: CardData) => {
    return (
        <div
            className={styles.containerCard}
            style={{ backgroundColor: colors[index % colors.length] }}
        >
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
