// Card.tsx
"use client";
import React, { useState } from "react";
import ModalEditName from "../Modals/ModalEditName";
import ModalDelete from "../Modals/ModalDelete";
import TooltipWrapper from "@/commons/Tooltip/Tooltip";
import Trash from "@/styles/icons/Trash";
import Edit from "@/styles/icons/Edit";
import styles from "./card.module.scss";

interface CardData {
    data?: any;
    index?: number;
}

const colors = ["#e74828", "#d4844e", "#f4a124", "#6f4324"];

const Card = ({ data, index = 0 }: CardData) => {
    const [openModal, setOpenModal] = useState<"none" | "edit" | "delete">(
        "none"
    );

    const handleOpenEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenModal((prev) => (prev === "edit" ? "none" : "edit"));
    };

    const handlerOpenDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenModal((prev) => (prev === "delete" ? "none" : "delete"));
    };

    const handleClose = () => setOpenModal("none");

    return (
        <>
            <div
                className={styles.containerCard}
                style={{ backgroundColor: colors[index % colors.length] }}
                onClick={(e) => {
                    if (openModal !== "none") {
                        e.preventDefault();
                        e.stopPropagation();
                        handleClose();
                    }
                }}
            >
                <div className={styles.topCard}>
                    <h3>{data?.title}</h3>
                    <TooltipWrapper content={"Editar"}>
                        <button type="button" onClick={handleOpenEdit}>
                            <i>
                                <Edit width="20" height="20" color="white" />
                            </i>
                        </button>
                    </TooltipWrapper>
                </div>
                <TooltipWrapper content={"Eliminar"}>
                    <button type="button" onClick={handlerOpenDelete}>
                        <i className={styles.bottomCard}>
                            <Trash width="20" height="20" color="white" />
                        </i>
                    </button>
                </TooltipWrapper>
            </div>

            {openModal === "edit" && (
                <ModalEditName
                    id={data}
                    isOpen={true}
                    setClose={handleClose}
                    color={colors[index % colors.length]}
                />
            )}

            {openModal === "delete" && (
                <ModalDelete
                    id={data}
                    isOpen={true}
                    setClose={handleClose}
                    color={colors[index % colors.length]}
                />
            )}
        </>
    );
};

export default Card;
