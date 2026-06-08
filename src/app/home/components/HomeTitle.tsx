"use client";

import TitleSection from "@/commons/Title/TitleSection";
import { useTranslation } from "react-i18next";

const HomeTitle = () => {
    const { t } = useTranslation();

    return <TitleSection title={t("home.title")} />;
};

export default HomeTitle;
