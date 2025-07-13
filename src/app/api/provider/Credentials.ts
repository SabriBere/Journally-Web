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

                    if (response.status === 201) {
                        return response.data;
                    }
                } catch (error: any) {
                    const status = error?.response.status;
                    const code = error?.code;
                    const message = error?.message;

                    if (status === 401) {
                        throw new Error("Credenciales invalidas");
                    }
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            // if (user) {
            //     return {
            //         ...token,
            //         userId: user?.data?.user_id,
            //         userName: user?.data.user_name,
            //         userEmail: user?.data?.email,
            //     };
            // }

            return token;
        },
        async session({ session, token }: any) {
            return {
                ...token,
                user: {
                    ...session?.user,
                },
            };
        },
    },
    pages: {
        signIn: "/login",
    },
};
