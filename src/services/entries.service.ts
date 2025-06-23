import axios, { AxiosError } from "axios";

//Trae todas las entradas
export async function getAllEntries() {
    try {
        //utilizar axios interceptor en las llamadas
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/entries`
        );
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
        throw error;
    }
}
