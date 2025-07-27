//configuración de axios
import { getSession } from "next-auth/react";
import { authOptions } from "@/app/api/provider/Credentials";
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor que agrega el token automáticamente
axiosInstance.interceptors.request.use(
    async (config: any) => {
        const session:any = await getSession();

        if (session?.user?.accessToken) {
            config.headers.Authorization = `Bearer ${session?.user?.accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
