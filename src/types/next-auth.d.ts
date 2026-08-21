import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        error?: "RefreshAccessTokenError";
        user?: {
            id?: string;
            accessToken?: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        accessTokenExpires?: number;
        error?: "RefreshAccessTokenError";
    }
}
