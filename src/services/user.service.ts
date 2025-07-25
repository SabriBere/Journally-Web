//consultar un end point utilizando server actions
import axios from "axios";

//Registrar usuario
export async function createUser(body: {
    email: string;
    password: string;
    user_name: string;
}) {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/register`,
            body
        );
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
        throw error;
    }
}
