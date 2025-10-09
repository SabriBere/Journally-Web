"use client";
import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonEditor = () => {
    return (
        <div
            style={{
                background: "#f1e1c6",
                borderRadius: "16px",
                padding: "20px",
                maxWidth: "680px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
            }}
        >
            <ContentLoader
                speed={2}
                width={600}
                height={400}
                viewBox="0 0 600 400"
                backgroundColor="#ead6b8"
                foregroundColor="#f9ecd5"
                uniqueKey={`editor-skel`}
            >
                {/* Título */}
                <rect x="0" y="10" rx="8" ry="8" width="200" height="24" />

                {/* Fecha */}
                <rect x="0" y="50" rx="6" ry="6" width="150" height="16" />

                {/* Párrafos */}
                <rect x="0" y="90" rx="4" ry="4" width="560" height="10" />
                <rect x="0" y="110" rx="4" ry="4" width="580" height="10" />
                <rect x="0" y="130" rx="4" ry="4" width="540" height="10" />
                <rect x="0" y="150" rx="4" ry="4" width="480" height="10" />

                <rect x="0" y="180" rx="4" ry="4" width="560" height="10" />
                <rect x="0" y="200" rx="4" ry="4" width="580" height="10" />
                <rect x="0" y="220" rx="4" ry="4" width="520" height="10" />
                <rect x="0" y="240" rx="4" ry="4" width="460" height="10" />

                <rect x="0" y="260" rx="4" ry="4" width="560" height="10" />
                <rect x="0" y="280" rx="4" ry="4" width="580" height="10" />
                <rect x="0" y="300" rx="4" ry="4" width="520" height="10" />
                <rect x="0" y="320" rx="4" ry="4" width="460" height="10" />

                <rect x="0" y="340" rx="4" ry="4" width="560" height="10" />
                <rect x="0" y="360" rx="4" ry="4" width="580" height="10" />
                <rect x="0" y="380" rx="4" ry="4" width="520" height="10" />
                <rect x="0" y="400" rx="4" ry="4" width="460" height="10" />
            </ContentLoader>
        </div>
    );
};

export default SkeletonEditor;
