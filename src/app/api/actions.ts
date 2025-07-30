"use server";
//consulta a end point login y end point refresh
import axios from "axios";

export async function userLoging({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
            email: email,
            password: password,
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
}

async function refreshToken(token: string) {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/users/refresh`,
            {
                headers: { "x-refresh-token": token },
            }
        );

        // return { ...token, accessToken};
    } catch (error) {
        console.error("Error al refrescar token", error);
        // return { ...token, error: "RefreshTokenError"}
    }
}
