import axios from "axios";
import { NextAuthOptions } from "next-auth";
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
                user: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                try {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
                        {
                            email: credentials.user,
                            password: credentials.password,
                        }
                    );

                    if (response.status === 201 && response.data?.data) {
                        const userData = response?.data?.data;
                        const accessToken = response.headers["x-access-token"];
                        const refreshToken = response.headers["x-refresh-token"];

                        // console.log(userData?.refresh, "llega el refresh en respuesta?");
                        return {
                            id: userData?.userId,
                            name: userData?.userName,
                            email: userData?.user,
                            accessToken,
                            refreshToken,
                        };
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
            // console.log(token, user?.refresh, 'jwt')
            if (user) {
                return {
                    ...token,
                    userId: user?.id,
                    userName: user?.name,
                    userEmail: user?.email,
                    accessToken: user?.accessToken,
                    refreshToken: user?.refreshToken,
                };
            }

            return token;
        },
        async session({ session, token }: any) {
            // console.log(session, token, 'session')
            return {
                ...session,
                user: {
                    id: token?.userId,
                    name: token?.userName,
                    email: token?.userEmail,
                    accessToken: token?.accessToken,
                    refreshToken: token?.refreshToken,
                },
            };
        },
    },
    pages: {
        signIn: "/login",
    },
};
