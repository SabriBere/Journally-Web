"use client";
import { ReactNode, useEffect } from "react";
import i18n from "./i18n";

type I18nProviderProps = {
    children: ReactNode;
};

const getBrowserLanguage = () => {
    const savedLanguage = window.localStorage.getItem("i18nextLng");
    const detectedLanguage = savedLanguage || window.navigator.language;
    const language = detectedLanguage.toLowerCase().startsWith("en")
        ? "en"
        : "es";

    return language;
};

const I18nProvider = ({ children }: I18nProviderProps) => {
    useEffect(() => {
        const language = getBrowserLanguage();

        i18n.changeLanguage(language);
        window.localStorage.setItem("i18nextLng", language);
        document.documentElement.lang = language;
    }, []);

    return <>{children}</>;
};

export default I18nProvider;
