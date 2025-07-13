// Configuración de next-auth
import { NextResponse } from "next/server";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(async function middleware(req: NextRequestWithAuth) {
    const authToken = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (!authToken && !req.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (authToken && req.nextUrl.pathname.startsWith("login")) {
        return NextResponse.redirect(new URL("/home", req.url));
    }

    if (authToken && req.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("home", req.url));
    }
});

// agregar regex dentro del matcher
export const config = {
    matcher: ["/", "/home", "/home/(.*)", "/entries", "/entries/(.*)"],
};
