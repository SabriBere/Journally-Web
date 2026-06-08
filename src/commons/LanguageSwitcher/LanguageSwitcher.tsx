"use client";

import { useTranslation } from "react-i18next";
import styles from "./languageSwitcher.module.scss";

interface LanguageSwitcherProps {
    className?: string;
}

const LanguageSwitcher = ({
    className = "",
}: LanguageSwitcherProps) => {
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.resolvedLanguage === "en" ? "en" : "es";
    const nextLanguage = currentLanguage === "en" ? "es" : "en";
    const buttonClassName = [styles.languageButton, className]
        .filter(Boolean)
        .join(" ");

    const handleChangeLanguage = async () => {
        await i18n.changeLanguage(nextLanguage);
        window.localStorage.setItem("i18nextLng", nextLanguage);
        document.documentElement.lang = nextLanguage;
    };

    return (
        <button
            type="button"
            className={buttonClassName}
            onClick={handleChangeLanguage}
            aria-label={t("language.changeTo", {
                language: t(`language.names.${nextLanguage}`),
            })}
        >
            <span className={styles.languageCode}>
                {currentLanguage.toUpperCase()}
            </span>
        </button>
    );
};

export default LanguageSwitcher;
