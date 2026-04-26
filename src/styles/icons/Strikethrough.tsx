import React from "react";
import { ColorProps } from "./Icons.types";

const Strikethrough = ({ color, width, height }: ColorProps) => (
    <svg fill={color} width={width} height={height} viewBox="0 0 256 256">
        <path d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8m-104 32H84.31a44 44 0 0 0 82.89 14.38 8 8 0 0 1 14.8 6.13A60 60 0 0 1 68.06 160H40a8 8 0 0 1 0-16h176a8 8 0 0 1 0 16h-80v48a8 8 0 0 1-16 0Zm-30.51-64a8 8 0 0 0 7.87-9.51A36 36 0 0 1 168 80a8 8 0 0 0 16 0 52 52 0 0 0-102.27-13.55A51.67 51.67 0 0 0 81.65 96Z" />
    </svg>
);

export default Strikethrough;
