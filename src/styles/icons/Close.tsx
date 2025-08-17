"use client"
import React from "react";
import { ColorProps } from "./Icons.types";

function Close({ color, width, height }: ColorProps) {
    return (
        <svg fill={"color"} width={width} height={height} viewBox="0 0 256 256">
            <path fill={color} d="M205.66 194.34a8 8 0 01-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 01-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0111.32-11.32L128 116.69l66.34-66.35a8 8 0 0111.32 11.32L139.31 128z" />
        </svg>
    );
}

export default Close;
