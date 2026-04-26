import React from "react";
import { ColorProps } from "./Icons.types";

const Italic = ({ color, width, height }: ColorProps) => (
    <svg
        fill={color} width={width} height={height}
        viewBox="0 0 256 256"
    >
        <path d="M200 56a8 8 0 0 1-8 8h-34.23L115.1 192H144a8 8 0 0 1 0 16H64a8 8 0 0 1 0-16h34.23L140.9 64H112a8 8 0 0 1 0-16h80a8 8 0 0 1 8 8"></path>
    </svg>
);

export default Italic;
