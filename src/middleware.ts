import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const authRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const authToken = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (authToken && authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/home", req.url));
    }

    if (!authToken && !authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (authToken && pathname === "/") {
        return NextResponse.redirect(new URL("/home", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/register",
        "/home/:path*",
        "/entries/:path*",
        "/collection/:path*",
    ],
};
