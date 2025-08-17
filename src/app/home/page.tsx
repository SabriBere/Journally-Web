import React from "react";
import TitleSection from "@/commons/Title/TitleSection";
import Tabs from "@/commons/Tabs/Tabs";
import ListCollections from "./components/ListCollections";
import ListPost from "./components/ListPost";
import styles from "./home.module.scss";
import InputSearch from "@/commons/Inputs/InputSearch";

const Home = () => {
    return (
        <div className={styles.containerHome}>
            <TitleSection title="Inicio" />
            <div className={styles.controls}>
                <Tabs />
                <InputSearch />
            </div>

            <div className={styles.containerHeader}>
                <ListCollections />
                <ListPost />
            </div>
        </div>
    );
};

export default Home;
