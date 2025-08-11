"use client";
import { useId } from "react";
import ContentLoader from "react-content-loader";
import styles from "./skeletonList.module.scss";

export const CardSkeleton = () => (
    <ContentLoader
        width={160}
        height={120}
        viewBox="0 0 160 120"
        speed={1.8}
        backgroundColor="#d2852e"
        foregroundColor="#f4a534"
        style={{ borderRadius: 24, transform: "rotate(-2deg)" }}
        uniqueKey={`card-skel-${useId()}`}
    >
        {/* Fondo de la card */}
        <rect x="0" y="0" rx="24" ry="24" width="160" height="120" />

        {/* Título (dos líneas cortas arriba izq) */}
        <rect x="14" y="16" rx="4" ry="4" width="90" height="10" />
        <rect x="14" y="34" rx="4" ry="4" width="70" height="10" />

        {/* Icono lápiz (arriba der) */}
        <circle cx="138" cy="24" r="8" />

        {/* Icono tacho (abajo der) */}
        <circle cx="138" cy="98" r="8" />
    </ContentLoader>
);

export const CardsSkeletonGrid = ({ count = 9 }: { count?: number }) => {
    return (
        <div className={styles.containerList}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} style={{ width: 160, height: 120 }}>
                    <CardSkeleton key={i} />
                </div>
            ))}
        </div>
    );
};
