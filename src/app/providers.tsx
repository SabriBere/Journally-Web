"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { SocketProvider } from "@/contexts/SocketContext";
import { store } from "../store/store";
import I18nProvider from "@/i18n/I18nProvider";
import Toast from "@/commons/Toast/Toast";

interface Props {
    children: React.ReactNode,
    session: any
}

const Providers = ({ children, session }: Props) => {
    const queryClient = new QueryClient();
    return (
        <I18nProvider>
            <SessionProvider session={session}>
                <QueryClientProvider client={queryClient}>
                    <Provider store={store}>
                        <SocketProvider>
                            {children}
                            <Toast />
                        </SocketProvider>
                    </Provider>
                    <ReactQueryDevtools buttonPosition="bottom-right" />
                </QueryClientProvider>
            </SessionProvider>
        </I18nProvider>

    );
};

export default Providers;
