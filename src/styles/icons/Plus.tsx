import React from "react";
import { ColorProps } from "./Icons.types";

function Plus({ color, width, height }: ColorProps) {
    return (
        <svg fill={color} width={width} height={height} viewBox="0 0 256 256">
            <path d="M216 32H88a8 8 0 00-8 8v40H40a8 8 0 00-8 8v128a8 8 0 008 8h128a8 8 0 008-8v-40h40a8 8 0 008-8V40a8 8 0 00-8-8zm-56 176H48V96h112zm48-48h-32V88a8 8 0 00-8-8H96V48h112z" />
        </svg>
    );
}

export default Plus;
