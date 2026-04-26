import React from "react";
import { ColorProps } from "./Icons.types";

const HardBreak = ({ color, width, height }: ColorProps) => (
    <svg fill={color} width={width} height={height} viewBox="0 0 256 256">
        <path d="M216 48a8 8 0 0 0-8 8v56a32 32 0 0 1-32 32H73.94l29.66-29.66a8 8 0 0 0-11.31-11.31l-43.31 43.31a8 8 0 0 0 0 11.32L92.29 201a8 8 0 0 0 11.31-11.31L73.94 160H176a48.05 48.05 0 0 0 48-48V56a8 8 0 0 0-8-8M48 64h112a8 8 0 0 0 0-16H48a8 8 0 0 0 0 16m96 48H48a8 8 0 0 0 0 16h96a8 8 0 0 0 0-16" />
    </svg>
);

export default HardBreak;
