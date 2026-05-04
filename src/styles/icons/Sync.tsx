import React from "react";
import { ColorProps } from "./Icons.types";

const Sync = ({ color, width, height }: ColorProps) => (
    <svg fill={color} width={width} height={height} viewBox="0 0 256 256">
        <path d="M224 48v48a8 8 0 0 1-8 8h-48a8 8 0 0 1 0-16h28.69l-20.35-20.34A72 72 0 0 0 54.5 103.19a8 8 0 0 1-15.49-4A88 88 0 0 1 187.66 56.34L208 76.69V48a8 8 0 0 1 16 0M201.5 152.81a72 72 0 0 1-121.84 35.53L59.31 168H88a8 8 0 0 0 0-16H40a8 8 0 0 0-8 8v48a8 8 0 0 0 16 0v-28.69l20.34 20.35A88 88 0 0 0 217 156.81a8 8 0 0 0-15.5-4"></path>
    </svg>
);

export default Sync;
