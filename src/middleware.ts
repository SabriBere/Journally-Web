// Configuración de next-auth
// import { WithAuthArgs } from "next-auth/middleware";

//agregar regex dentro del matcher
export const config = {
    matcher: [
        "/",
        "/login",
        "/home",
        "/home/(.*)",
        "/entries",
        "/entries/(.*)",
    ],
};
