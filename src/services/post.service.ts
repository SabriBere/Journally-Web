import axiosInstance from "@/config/axiosInterceptor.server";

//Crear un post sin colección
export async function createPost(
    body: { title: string; description: string },
) {
    try {
        //pasar body y parametros x query
        const res = await axiosInstance.post(
            `/post/createOne`,
            body
        );
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
    orderFiled,
    orderDirection,
}: {
    page: string | number;
    searchText?: string | undefined;
    orderFiled?: string | undefined;
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

        if (orderFiled !== undefined) {
            params.append("orderFild", orderFiled);
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
        description: string;
    },
    postId: string | number
) {
    try {
        const params = new URLSearchParams();

        if (postId !== undefined) {
            params.append("postId", postId.toString());
        }
        const res = await axiosInstance.put(
            `/post/updatePost/?${params.toString()}`,
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
