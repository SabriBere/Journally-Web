import React from "react";
import TitleSection from "@/commons/Title/TitleSection";
import Tabs from "@/commons/Tabs/Tabs";
import ListCollections from "./components/ListCollections";
import ListPost from "./components/ListPost";
import styles from "./home.module.scss";

const Home = () => {
    return (
        <div className={styles.containerHome}>
            {/* <TitleSection title={"Inicio"} /> */}
            <div className={styles.containerHeader}>
                {/* Agregar componente de pestañas */}
                <Tabs />
                {/* Agregar componente de input search con funcionalidad */}
                <ListCollections />
                <ListPost />
            </div>
        </div>
    );
};

export default Home;
