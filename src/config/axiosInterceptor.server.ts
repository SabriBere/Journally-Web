import { getSession, signOut } from "next-auth/react";
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

let logoutInProgress = false;

// Interceptor que agrega el token automáticamente
axiosInstance.interceptors.request.use(
    async (config: any) => {
        const session: any = await getSession();
        // console.log(session?.user?.accessToken, 'token del usuario?');

        if (session?.user?.accessToken) {
            config.headers["x-access-token"] = session?.user?.accessToken;
        }

        //tengo que hacer que se envien solo cuando se vence el token
        // if (session?.user?.refreshToken) {
        //     config.headers["x-refresh-token"] = session?.user?.refreshToken;
        // }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (
            error?.response?.status === 401 &&
            typeof window !== "undefined" &&
            !logoutInProgress
        ) {
            logoutInProgress = true;
            await signOut({ callbackUrl: "/login", redirect: true });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
