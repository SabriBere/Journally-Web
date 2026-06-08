"use client";

import { useTranslation } from "react-i18next";

const CollectionPlaceholder = () => {
    const { t } = useTranslation();

    return <div>{t("collection.placeholder")}</div>;
};

export default CollectionPlaceholder;
