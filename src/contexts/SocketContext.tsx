"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useSession } from "next-auth/react";

type SocketStatus = "idle" | "connecting" | "open" | "closed" | "error";

type SocketContextValue = {
    socket: WebSocket | null;
    status: SocketStatus;
    sendMessage: WebSocket["send"];
    // eslint-disable-next-line no-unused-vars
    sendJson: (payload: unknown) => boolean;
};

type SessionWithSocketToken = {
    user?: {
        id?: string | number | null;
        accessToken?: string | null;
    } | null;
};

const SocketContext = createContext<SocketContextValue | null>(null);

const buildSocketUrl = (baseUrl: string, token: string) => {
    const url = new URL(baseUrl);
    url.searchParams.set("token", token);
    return url.toString();
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status: sessionStatus } = useSession();
    const accessToken = (session as SessionWithSocketToken | null)?.user
        ?.accessToken;
    const socketRef = useRef<WebSocket | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [status, setStatus] = useState<SocketStatus>("idle");

    useEffect(() => {
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
        let shouldReconnect = true;
        let reconnectTimer: number | null = null;

        if (!socketUrl) {
            console.warn("NEXT_PUBLIC_SOCKET_URL no esta configurada");
            return;
        }

        if (sessionStatus !== "authenticated" || !accessToken) {
            setStatus("idle");
            return;
        }

        const connect = () => {
            setStatus("connecting");

            const nextSocket = new WebSocket(buildSocketUrl(socketUrl, accessToken));
            socketRef.current = nextSocket;
            setSocket(nextSocket);

            nextSocket.addEventListener("open", () => {
                if (socketRef.current !== nextSocket) return;

                setStatus("open");
                console.info("Socket conectado");
            });

            nextSocket.addEventListener("error", () => {
                if (socketRef.current !== nextSocket) return;

                setStatus("error");
                console.error("No se pudo conectar al socket");
            });

            nextSocket.addEventListener("message", (event) => {
                console.info("Socket mensaje recibido", event.data);
            });

            nextSocket.addEventListener("close", (event) => {
                if (socketRef.current !== nextSocket) return;

                socketRef.current = null;
                setSocket(null);

                if (event.code === 1008) {
                    shouldReconnect = false;
                    setStatus("closed");
                    console.error("Socket cerrado por autenticacion:", event.reason);
                    return;
                }

                if (!shouldReconnect) {
                    setStatus("closed");
                    return;
                }

                setStatus("connecting");
                reconnectTimer = window.setTimeout(connect, 1000);
            });
        };

        connect();

        return () => {
            shouldReconnect = false;

            if (reconnectTimer) {
                window.clearTimeout(reconnectTimer);
            }

            const currentSocket = socketRef.current;
            socketRef.current = null;
            setSocket(null);

            currentSocket?.close();
        };
    }, [sessionStatus, accessToken]);

    const sendMessage = useCallback((message: Parameters<WebSocket["send"]>[0]) => {
        const currentSocket = socketRef.current;

        if (!currentSocket || currentSocket.readyState !== WebSocket.OPEN) {
            return false;
        }

        currentSocket.send(message);
        return true;
    }, []);

    const sendJson = useCallback(
        (message: unknown) => {
            return sendMessage(JSON.stringify(message));
        },
        [sendMessage]
    );

    const value = useMemo(
        () => ({
            socket,
            status,
            sendMessage,
            sendJson,
        }),
        [socket, status, sendMessage, sendJson]
    );

    return (
        <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error("useSocket debe usarse dentro de SocketProvider");
    }

    return context;
};
