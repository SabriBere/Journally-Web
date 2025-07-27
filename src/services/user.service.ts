//consultar un end point utilizando server actions
import axiosInstance from "@/config/axiosInterceptor.server";

//Registrar usuario
export async function createUser(body: {
    email: string;
    password: string;
    user_name: string;
}) {
    try {
        const res = await axiosInstance.post(`/register`, body);
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
        throw error;
    }
}
