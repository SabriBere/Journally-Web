import React from "react";
import { ColorProps } from "./Icons.types";

const InlineCode = ({ color, width, height }: ColorProps) => (
    <svg fill={color} width={width} height={height} viewBox="0 0 256 256">
        <path d="M77.66 90.34a8 8 0 0 1 0 11.32L51.31 128l26.35 26.34a8 8 0 0 1-11.32 11.32l-32-32a8 8 0 0 1 0-11.32l32-32a8 8 0 0 1 11.32 0m112 0a8 8 0 0 0-11.32 11.32L204.69 128l-26.35 26.34a8 8 0 0 0 11.32 11.32l32-32a8 8 0 0 0 0-11.32ZM152 80h-48a8 8 0 0 0 0 16h48a8 8 0 0 0 0-16m16 40H88a8 8 0 0 0 0 16h80a8 8 0 0 0 0-16m-16 40h-48a8 8 0 0 0 0 16h48a8 8 0 0 0 0-16" />
    </svg>
);

export default InlineCode;
