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
        console.log(session);

        if (session?.user?.accessToken) {
            config.headers.Authorization = `Bearer ${session?.user?.accessToken}`;
        }

        if (session?.user?.refreshToken) {
            console.log("tengo el refresh");
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
