import React from "react";
import TitleSection from "@/commons/Title/TitleSection";
import styles from "./home.module.scss";

const Home = () => {
    return (
        <div className={styles.containerHome}>
            <TitleSection title={"Posteos"} />
        </div>
    );
};

export default Home;
