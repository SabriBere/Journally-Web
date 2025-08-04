import axiosInstance from "@/config/axiosInterceptor.server";

//Crear una colección
export async function createCollection(body: {
    collectionName: string;
    title: string;
    userId: number;
}) {
    try {
        const res = await axiosInstance.post(
            `/collections/createCollection`,
            body
        );
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
        throw error;
    }
}

//Listado de colecciones paginadas y filtro
export async function allCollection(
    id: number | string,
    page: number | string,
    searchTeaxt: string | undefined,
    orderField: string | undefined,
    orderDirection: string | undefined
) {
    try {
        const res = await axiosInstance.get(
            `/allCollections?id=${id}&page=${page}&searchText=${searchTeaxt}&orderField=${orderField}&orderDirection=${orderDirection}`
        );

        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
        throw error;
    }
}

//Obtener una colección por id
export async function collectionById(id: string) {
    try {
        const res = await axiosInstance.get(`/collectionId?id=${id}`);
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
        throw error;
    }
}

//Actualizar el nombre de una colección
export async function updateCollection(body: {
    title: string;
    collectionId: string;
}) {
    try {
        const res = await axiosInstance.put(`/updateCollection`, body);
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
        throw error;
    }
}

//Eliminar una colección
export async function deleteCollection(id: number | string | undefined) {
    try {
        const res = await axiosInstance.delete(`/deteleCollection?id=${id}`);
        return res.data.data;
    } catch (error: any) {
        console.error(`Error - Code: ${error.code}, Message: ${error.message}`);
        throw error;
    }
}
