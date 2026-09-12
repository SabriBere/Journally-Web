import axiosInstance from "@/config/axiosInterceptor.server";
import type { PostDescription } from "@/types/editor";

//Crear un post sin colección
export async function createPost(body: {
    title: string;
    description: PostDescription;
}) {
    try {
        //pasar body y parametros x query
        const res = await axiosInstance.post(`/post/createOne`, body);
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
    }
}

//Trae todas las entradas
//Pasar parametros, si tiene
export async function getAllPost({
    page,
    searchText,
    orderField,
    orderDirection,
}: {
    page: string | number;
    searchText?: string | undefined;
    orderField?: string | undefined;
    orderDirection?: string | undefined;
}) {
    try {
        const params = new URLSearchParams();

        if (page !== undefined) {
            params.append("page", page.toString());
        }

        if (searchText !== undefined) {
            params.append("searchText", searchText);
        }

        if (orderField !== undefined) {
            params.append("orderField", orderField);
        }

        if (orderDirection !== undefined) {
            params.append("orderDirection", orderDirection);
        }

        const res = await axiosInstance.get(`/post/?${params.toString()}`);
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
        throw error;
    }
}

//Traer una entrada por id
export async function getPostById(postId: number | string | undefined) {
    try {
        const res = await axiosInstance.get(`/post/findOne?postId=${postId}`);
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
        throw error;
    }
}

//Actualizar un post sin colección
export async function updatePost(
    body: {
        title?: string | undefined;
        description: PostDescription;
    },
    postId: string | number,
    userId?: number | string | undefined
) {
    try {
        const params = new URLSearchParams();

        if (postId !== undefined) {
            params.append("postId", postId.toString());
        }

        if (userId !== undefined) {
            params.append("userId", userId.toString());
        }
        
        const res = await axiosInstance.put(
            `/post/autosave/?${params.toString()}`,
            body
        );
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
        throw error;
    }
}

//Eliminar un post
export async function deletePost(postId: string | number) {
    const params = new URLSearchParams();

    if (postId !== undefined) {
        params.append("postId", postId.toString());
    }
    try {
        const res = await axiosInstance.delete(
            `/post/deletePost?${params.toString()}`
        );
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
        throw error;
    }
}
