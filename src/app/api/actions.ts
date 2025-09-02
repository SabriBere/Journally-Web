"use server";
import axios from "axios";
import jwt from "jsonwebtoken";

const axiosPublic = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json" },
    // sin interceptores
});

//aca setea los headers
export async function userLoging({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const body = { email, password };
    const response = await axiosPublic.post("/users/login", body);

    if (response.status === 201 && response.data?.data) {
        const userData = response.data.data;

        // Si tu API devuelve los tokens en headers
        const accessToken = response.headers["x-access-token"];
        // const refreshToken = response.headers["x-refresh-token"];

        return {
            id: userData.userId,
            name: userData.userName,
            email: userData.user,
            accessToken,
            // refreshToken,
        };
    }

    return null;
}

// export async function refreshAccessToken(token: any) {
//     console.log(token?.refreshToken)
//     try {
//         const response = await axios.post(
//             `${process.env.NEXT_PUBLIC_API_URL}/users/refresh`,
//             {},
//             {
//                 headers: {
//                     "x-refresh-token": token,
//                 },
//             }
//         );

//         const accessToken = response.headers["x-access-token"];
//         const refreshToken = response.headers["x-refresh-token"];
//         console.log(accessToken, refreshToken, 'nuevos')

//         // Decodificamos exp del nuevo token
//         const decoded: any = jwt.decode(accessToken);
//         console.log(decoded, 'expiración token')

//         return {
//             ...token,
//             accessToken: accessToken,
//             accessTokenExpires: decoded?.exp
//                 ? decoded.exp * 1000
//                 : Date.now() + 15 * 60 * 1000,
//         };
//     } catch (error) {
//         console.error("Error al refrescar token", error);

//         // return {
//         //     ...token,
//         //     error: "RefreshAccessTokenError",
//         // };
//     }
// }
