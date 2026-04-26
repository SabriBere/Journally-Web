import React from "react";
import { ColorProps } from "./Icons.types";

const HorizontalRule = ({ color, width, height }: ColorProps) => (
    <svg fill={color} width={width} height={height} viewBox="0 0 256 256">
        <path d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8M64 80h128a8 8 0 0 0 0-16H64a8 8 0 0 0 0 16m128 96H64a8 8 0 0 0 0 16h128a8 8 0 0 0 0-16" />
    </svg>
);

export default HorizontalRule;
