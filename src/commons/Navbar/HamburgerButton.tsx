"use client";
import styles from "./hamburgerButton.module.scss";

interface HamburgerButtonProps {
    isOpen: boolean;
    onClick: () => void;
    className?: string;
}

const HamburgerButton = ({
    isOpen,
    onClick,
    className = "",
}: HamburgerButtonProps) => {
    const buttonClassName = [styles.menuButton, className]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type="button"
            className={buttonClassName}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            onClick={onClick}
        >
            <span />
            <span />
            <span />
        </button>
    );
};

export default HamburgerButton;
