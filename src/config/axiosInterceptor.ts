//configuración de axios
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Interceptor que agrega el token automáticamente

export default axiosInstance;
