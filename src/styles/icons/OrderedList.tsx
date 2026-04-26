import React from "react";
import { ColorProps } from "./Icons.types";

const OrderedList = ({ color, width, height }: ColorProps) => (
    <svg fill={color} width={width} height={height} viewBox="0 0 256 256">
        <path d="M96 64a8 8 0 0 1 8-8h112a8 8 0 0 1 0 16H104a8 8 0 0 1-8-8m120 56H104a8 8 0 0 0 0 16h112a8 8 0 0 0 0-16m0 64H104a8 8 0 0 0 0 16h112a8 8 0 0 0 0-16M48 72h8v32a8 8 0 0 0 16 0V64a8 8 0 0 0-8-8H48a8 8 0 0 0 0 16m24 88a24 24 0 0 0-48 0 8 8 0 0 0 16 0 8 8 0 1 1 13.66 5.66l-27.32 27.31A8 8 0 0 0 32 208h32a8 8 0 0 0 0-16H51.31l13.66-13.66A23.85 23.85 0 0 0 72 160" />
    </svg>
);

export default OrderedList;
