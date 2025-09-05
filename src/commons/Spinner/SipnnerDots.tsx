"use client";
import React from "react";
import styles from "./spinnerDots.module.scss";

interface SpinnerDotsProps {
    color?: string;
    size?: number;
}

const SpinnerDots = ({ color, size }: SpinnerDotsProps) => {
    return (
        <div
            className={styles.spinner}
            style={
                {
                    "--dot-color": color,
                    "--dot-size": `${size}px`,
                } as React.CSSProperties
            }
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default SpinnerDots;
