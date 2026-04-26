import React from "react";
import { ColorProps } from "./Icons.types";

const HorizontalRule = ({ color, width, height }: ColorProps) => (
    <svg fill="none" width={width} height={height} viewBox="0 0 256 256">
        <path
            d="M40 128h176"
            stroke={color}
            strokeLinecap="round"
            strokeWidth="18"
        />
        <path
            d="M72 88h112M72 168h112"
            stroke={color}
            strokeLinecap="round"
            strokeWidth="10"
            opacity="0.45"
        />
    </svg>
);

export default HorizontalRule;
