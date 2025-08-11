import React from "react";
import styles from './titleSection.module.scss'

interface TitleSectionProps {
    title: string;
}

const TitleSection = ({ title }: TitleSectionProps) => {
    return (
        <div className={styles.containerTitle}>
            <h1>{title}</h1>
        </div>
    );
};

export default TitleSection;
