import React from "react";
import { ColorProps } from "./Icons.types";

const ListItem = ({ color, width, height }: ColorProps) => (
    <svg fill={color} width={width} height={height} viewBox="0 0 256 256">
        <path d="M88 72a8 8 0 0 1 8-8h120a8 8 0 0 1 0 16H96a8 8 0 0 1-8-8m128 48H96a8 8 0 0 0 0 16h120a8 8 0 0 0 0-16m0 56H96a8 8 0 0 0 0 16h120a8 8 0 0 0 0-16M48 64a12 12 0 1 0 12 12 12 12 0 0 0-12-12m0 56a12 12 0 1 0 12 12 12 12 0 0 0-12-12m8 52v-12a8 8 0 0 0-16 0v12H28a8 8 0 0 0 0 16h12v12a8 8 0 0 0 16 0v-12h12a8 8 0 0 0 0-16Z" />
    </svg>
);

export default ListItem;
