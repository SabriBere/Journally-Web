"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import NotFoundIllustration from "@/commons/Ilustrations/NotFound";
import styles from "./notFound.module.scss";

interface NotFoundContentProps {
    actionHref: string;
    actionType: "home" | "login";
}

const NotFoundContent = ({ actionHref, actionType }: NotFoundContentProps) => {
    const { t } = useTranslation();

    return (
        <main className={styles.page}>
            <section className={styles.hero} aria-labelledby="not-found-title">
                <div className={styles.copy}>
                    <p className={styles.kicker}>{t("notFound.kicker")}</p>
                    <h1 id="not-found-title" className={styles.title}>
                        {t("notFound.title.lineOne")}
                        <br />
                        {t("notFound.title.lineTwo")}
                    </h1>
                    <p className={styles.description}>
                        {t("notFound.description")}
                    </p>

                    <div className={styles.actions}>
                        <Link href={actionHref} className={styles.primaryAction}>
                            {t(`notFound.actions.${actionType}`)}
                        </Link>
                    </div>
                </div>

                <div className={styles.visual} aria-hidden="true">
                    <NotFoundIllustration width="90%" height="100%" />
                </div>
            </section>
        </main>
    );
};

export default NotFoundContent;
