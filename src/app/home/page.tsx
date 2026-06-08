import React from "react";
import ListCollections from "./components/ListCollections";
import ListPost from "./components/ListPost";
import InputSearch from "@/commons/Inputs/InputSearch";
import ButtonCreate from "@/commons/Buttons/ButtonCreate";
import HomeTitle from "./components/HomeTitle";
import styles from "./home.module.scss";

const Home = () => {
    return (
        <div className={styles.containerHome}>
            <HomeTitle />
            <div className={styles.controls}>
                <InputSearch />
                <ButtonCreate />
            </div>

            <div className={styles.containerHeader}>
                <ListCollections />
                <ListPost />
            </div>
        </div>
    );
};

export default Home;
