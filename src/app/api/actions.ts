//consulta a end point login y end point refresh

import axios from "axios";

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
