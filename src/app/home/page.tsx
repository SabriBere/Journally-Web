import React from "react";
import TitleSection from "@/commons/Title/TitleSection";
import ListCollections from "./components/ListCollections";
import styles from "./home.module.scss";
import Tabs from "@/commons/Tabs/Tabs";
import ListPost from "./components/ListPost";

const Home = () => {
    return (
        <div className={styles.containerHome}>
            <TitleSection title={"Inicio"} />
            <div>
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
