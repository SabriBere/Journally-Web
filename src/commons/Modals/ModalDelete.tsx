import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Check from "@/styles/icons/Check";
import Close from "@/styles/icons/Close";
import styles from "./ModalDelete.module.scss";

//Model a un common de types
interface ModalProps {
    id: any;
    isOpen: boolean;
    setClose: React.Dispatch<React.SetStateAction<boolean>>;
    color: string;
}

const ModalDelete = ({ id, isOpen, setClose, color }: ModalProps) => {
    const tabs = useSelector((state: RootState) => state.tabs.tabs);
    const textModal =
        tabs === "collections"
            ? "¿Desea eliminar esta colección?"
            : "¿Desea eliminar este post?";

    return (
        <form
            className={styles.containerModalDelete}
            style={{ backgroundColor: color }}
        >
            <div className={styles.miniModal}>
                <p>{textModal}</p>
            </div>
            <button type="button">
                <Check color={"#11796f"} width="20" height="20" />
            </button>
            <button type="button">
                <Close color={"#0d1e2b"} width="20" height="20" />
            </button>
        </form>
    );
};

export default ModalDelete;
