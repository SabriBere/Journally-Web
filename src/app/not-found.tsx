import Link from "next/link";
import NotFoundIllustration from "@/commons/Ilustrations/NotFound";
import styles from "./notFound.module.scss";

const NotFound = () => {
    return (
        <main className={styles.page}>
            <section className={styles.hero} aria-labelledby="not-found-title">
                <div className={styles.copy}>
                    <p className={styles.kicker}>404 / Pagina no encontrada</p>
                    <h1 id="not-found-title" className={styles.title}>
                        Esta pagina se perdio
                        <br />
                        entre tus notas.
                    </h1>
                    <p className={styles.description}>
                        El enlace que abriste no existe, fue movido o todavia no fue
                        escrito. Volvamos a tu espacio de journaling.
                    </p>

                    <div className={styles.actions}>
                        <Link href="/home" className={styles.primaryAction}>
                            Volver al inicio
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

export default NotFound;
