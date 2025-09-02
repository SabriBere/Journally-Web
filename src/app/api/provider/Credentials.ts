import { NextAuthOptions } from "next-auth";
import { userLoging } from "../actions";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 días
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                try {
                    const user = await userLoging({
                        email: credentials.email,
                        password: credentials.password,
                    });

                    if (user) {
                        return user;
                    }

                    return null;
                } catch (error: any) {
                    const status = error?.response.status;
                    const code = error?.code;
                    const message = error?.message;

                    if (status === 401) {
                        throw new Error("Credenciales invalidas");
                    }
                    throw new Error("Error al iniciar sesión");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {

            if (user) {
                // console.log(user?.accessToken, "seteo en jwt");
                return {
                    ...token,
                    userId: user?.id,
                    userName: user?.name,
                    userEmail: user?.email,
                    accessToken: user?.accessToken,
                    // refreshToken: user?.refreshToken,
                };
            }

            return token;
        },
        async session({ session, token }: any) {
            // console.log(token?.accessToken, "seteo en sesion");
            return {
                ...session,
                user: {
                    id: token?.userId,
                    name: token?.userName,
                    email: token?.userEmail,
                    accessToken: token?.accessToken,
                    // refreshToken: token?.refreshToken,
                },
            };
        },
    },
    pages: {
        signIn: "/login",
    },
};
