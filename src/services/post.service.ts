import axiosInstance from "@/config/axiosInterceptor";

//Crear un post sin colección
export async function createPost(
    body: { title: string; description: string },
    userId: number | string,
    collectionId: number | string
) {
    try {
        //pasar body y parametros x query
        const res = await axiosInstance.post(
            `/create?userId=${userId}&collectionId=${collectionId}`,
            body
        );
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
    }
}

//Trae todas las entradas
export async function getAllPost() {
    try {
        //utilizar axios interceptor en las llamadas
        const res = await axiosInstance.get(`/post/`);
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
        throw error;
    }
}

//Traer una entrada por id
export async function getPostById(postId: number | string) {
    try {
        const res = await axiosInstance.get(`/findOne?postId=${postId}`);
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
        throw error;
    }
}

//Actualizar un post sin colección
export async function updatePost(
    body: {
        title?: string;
        description: string;
    },
    postId: string | number
) {
    try {
        const res = await axiosInstance.put(
            `/updatePost?postId=${postId}`,
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
    try {
        const res = await axiosInstance.delete(`/updatePost?postId=${postId}`);
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
        throw error;
    }
}
