"use client";

import React from "react";
import styles from "./switch.module.scss";

type SwitchProps = {
    checked: boolean;
    label: string;
    title?: string;
    isLoading?: boolean;
    name?: string;
    disabled?: boolean;
    // eslint-disable-next-line no-unused-vars
    onChange: (checked: boolean) => void;
};

const Switch = ({
    checked,
    label,
    title,
    isLoading,
    name,
    disabled,
    onChange,
}: SwitchProps) => {
    const switchId = React.useId();

    return (
        <label className={styles.switchWrapper} htmlFor={switchId} title={title}>
            <input
                id={switchId}
                className={styles.switchInput}
                type="checkbox"
                name={name}
                checked={checked}
                disabled={disabled}
                aria-label={title || label}
                onChange={(event) => onChange(event.target.checked)}
            />
            <span className={styles.switchTrack} aria-hidden="true">
                <span className={styles.switchThumb} />
            </span>
            <span className={styles.switchLabel}>
                {label}
                {isLoading && (
                    <span className={styles.switchLoadingDots} aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </span>
                )}
            </span>
        </label>
    );
};

export default Switch;
