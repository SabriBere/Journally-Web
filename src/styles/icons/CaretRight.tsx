import React from "react";
import { ColorProps } from "./Icons.types";

function CaretRight({ color, width, height }: ColorProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 256 256"
        >
            <path d="M181.66 133.66l-80 80a8 8 0 01-11.32-11.32L164.69 128 90.34 53.66a8 8 0 0111.32-11.32l80 80a8 8 0 010 11.32z" />
        </svg>
    );
}

export default CaretRight;
