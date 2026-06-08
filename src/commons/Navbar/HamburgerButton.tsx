"use client";
import { useTranslation } from "react-i18next";
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
    const { t } = useTranslation();
    const buttonClassName = [styles.menuButton, className]
        .filter(Boolean)
        .join(" ");

    return (
        <button
            type="button"
            className={buttonClassName}
            aria-label={
                isOpen ? t("navbar.closeMenu") : t("navbar.openMenu")
            }
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
