"use server";
import axios from "axios";
import jwt from "jsonwebtoken";

const axiosPublic = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { "Content-Type": "application/json" },
    // sin interceptores
});

type RefreshedTokens = {
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
};

const pendingRefreshes = new Map<string, Promise<RefreshedTokens>>();

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
        const refreshToken = response.headers["x-refresh-token"];
        const decodedAccessToken = jwt.decode(
            accessToken
        ) as jwt.JwtPayload | null;

        return {
            id: userData.userId,
            name: userData.userName,
            email: userData.user,
            accessToken,
            refreshToken,
            accessTokenExpires: decodedAccessToken?.exp
                ? decodedAccessToken.exp * 1000
                : Date.now(),
        };
    }

    return null;
}

export async function userRegister({
    email,
    password,
    userName,
}: {
    email: string;
    password: string;
    userName?: string;
}) {
    const body = {
        email,
        password,
        ...(userName ? { user_name: userName } : {}),
    };
    const response = await axiosPublic.post("/users/register", body);

    return response.status === 200 ? response.data?.data : null;
}

export async function refreshAccessToken(refreshToken: string) {
    const existingRefresh = pendingRefreshes.get(refreshToken);
    if (existingRefresh) return existingRefresh;

    const refreshRequest = (async (): Promise<RefreshedTokens> => {
        const response = await axiosPublic.post(
            "/users/refresh",
            {},
            {
                headers: {
                    "x-refresh-token": refreshToken,
                },
            }
        );

        const accessToken = response.headers["x-access-token"];
        const rotatedRefreshToken = response.headers["x-refresh-token"];
        const decodedAccessToken = jwt.decode(
            accessToken
        ) as jwt.JwtPayload | null;

        if (!accessToken || !rotatedRefreshToken || !decodedAccessToken?.exp) {
            throw new Error("La API no devolvio tokens de sesion validos");
        }

        return {
            accessToken,
            refreshToken: rotatedRefreshToken,
            accessTokenExpires: decodedAccessToken.exp * 1000,
        };
    })();

    pendingRefreshes.set(refreshToken, refreshRequest);

    try {
        return await refreshRequest;
    } finally {
        pendingRefreshes.delete(refreshToken);
    }
}

export async function revokeRefreshToken(refreshToken?: string) {
    if (!refreshToken) return;

    await axiosPublic.post(
        "/users/logout",
        {},
        { headers: { "x-refresh-token": refreshToken } }
    );
}
