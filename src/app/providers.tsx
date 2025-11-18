"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Toast from "@/commons/Toast/Toast";

interface Props{
    children: React.ReactNode,
    session: any
}

const Providers = ({ children, session }: Props) => {
    const queryClient = new QueryClient();
    return (
        <SessionProvider session={session}>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    {children}
                    <Toast />
                </Provider>
                <ReactQueryDevtools buttonPosition="bottom-right" />
            </QueryClientProvider>
        </SessionProvider>
    );
};

export default Providers;
