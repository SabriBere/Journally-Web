import React from "react";
import TitleSection from "@/commons/Title/TitleSection";
import ListCollections from "./components/ListCollections";
import styles from "./home.module.scss";

const Home = () => {
    return (
        <div className={styles.containerHome}>
            <TitleSection title={"Inicio"} />
            {/* Agregar componente de pestañas */}
            <ListCollections />
        </div>
    );
};

export default Home;
