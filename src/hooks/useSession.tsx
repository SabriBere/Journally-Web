"use client";
import { useSession } from "next-auth/react";

const useSessionHook = () => {
    const { data: session }: any = useSession();

    const email = session?.user?.email;
    const name = session?.user?.name;
    const token = session?.user?.accessToken;

    return { email, name, token };
};

export default useSessionHook;
