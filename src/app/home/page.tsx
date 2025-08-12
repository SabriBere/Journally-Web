import React from "react";
import TitleSection from "@/commons/Title/TitleSection";
import ListCollections from "./components/ListCollections";
import styles from "./home.module.scss";
import Tabs from "@/commons/Tabs/Tabs";

const Home = () => {
    return (
        <div className={styles.containerHome}>
            <TitleSection title={"Inicio"} />
            {/* Agregar componente de pestañas */}
            <Tabs />
            {/* Agregar componente de input search con funcionalidad */}
            {/* <ListCollections /> */}
        </div>
    );
};

export default Home;
