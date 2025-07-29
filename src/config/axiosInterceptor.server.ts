//configuración de axios
import { getSession } from "next-auth/react";
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor que agrega el token automáticamente
axiosInstance.interceptors.request.use(
    async (config: any) => {
        const session: any = await getSession();
        // console.log(session);

        if (session?.user?.accessToken) {
            config.headers["x-access-token"] = session?.user?.accessToken;
        }

        if (session?.user?.refreshToken) {
            config.headers["x-refresh-token"] = session?.user?.refreshToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
