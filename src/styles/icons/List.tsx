import React from "react";
import { ColorProps } from "./Icons.types";

function List({ color, width, height }: ColorProps) {
    return (
        <svg fill={color} width={width} height={height} viewBox="0 0 256 256">
            <path d="M88 64a8 8 0 018-8h120a8 8 0 010 16H96a8 8 0 01-8-8zm128 56H96a8 8 0 000 16h120a8 8 0 000-16zm0 64H96a8 8 0 000 16h120a8 8 0 000-16zM56 56H40a8 8 0 000 16h16a8 8 0 000-16zm0 64H40a8 8 0 000 16h16a8 8 0 000-16zm0 64H40a8 8 0 000 16h16a8 8 0 000-16z" />
        </svg>
    );
}

export default List;
