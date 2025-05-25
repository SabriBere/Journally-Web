import React from "react";
import Button from "@/components/Buttons/Button";
import styles from "./home.module.scss";

//configurar formatter
const Home = () => {
    return (
        <div className={styles.containerHome}>
            <h1>Home</h1>
            <Button />
        </div>
    );
};

export default Home;
