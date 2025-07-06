import React from "react";
import { ColorProps } from "./Icons.types";

function Check({ color, width, height }: ColorProps) {
    return (
        <svg fill={color} width={width} height={height} viewBox="0 0 256 256">
            <path d="M229.66 77.66l-128 128a8 8 0 01-11.32 0l-56-56a8 8 0 0111.32-11.32L96 188.69 218.34 66.34a8 8 0 0111.32 11.32z" />
        </svg>
    );
}

export default Check;
