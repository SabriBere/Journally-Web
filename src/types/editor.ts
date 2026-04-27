export type PostDescription =
    | string
    | number
    | boolean
    | null
    | { [key: string]: unknown }
    | unknown[];
