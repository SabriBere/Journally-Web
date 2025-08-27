import React from "react";
import TitleSection from "@/commons/Title/TitleSection";
import Tabs from "@/commons/Tabs/Tabs";
import ListCollections from "./components/ListCollections";
import ListPost from "./components/ListPost";
import InputSearch from "@/commons/Inputs/InputSearch";
import ButtonCreate from "@/commons/Buttons/ButtonCreate";
import styles from "./home.module.scss";

const Home = () => {
    return (
        <div className={styles.containerHome}>
            <TitleSection title="Inicio" />
            <div className={styles.controls}>
                <Tabs />
                <div className={styles.options}>
                    <InputSearch />
                    <ButtonCreate />
                </div>
            </div>

            <div className={styles.containerHeader}>
                <ListCollections />
                <ListPost />
            </div>
        </div>
    );
};

export default Home;
