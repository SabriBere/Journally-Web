"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "../store/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>{children}</Provider>
            <ReactQueryDevtools buttonPosition="bottom-right" />
        </QueryClientProvider>
    );
};

export default Providers;
