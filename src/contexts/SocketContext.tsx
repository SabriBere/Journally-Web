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

type SocketStatus = "idle" | "connecting" | "open" | "closed" | "error";

type SocketContextValue = {
    socket: WebSocket | null;
    status: SocketStatus;
    sendMessage: WebSocket["send"];
    // eslint-disable-next-line no-unused-vars
    sendJson: (payload: unknown) => boolean;
};

const SocketContext = createContext<SocketContextValue | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const socketRef = useRef<WebSocket | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [status, setStatus] = useState<SocketStatus>("idle");

    useEffect(() => {
        const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

        if (!socketUrl) {
            console.warn("NEXT_PUBLIC_SOCKET_URL no esta configurada");
            return;
        }

        setStatus("connecting");

        const nextSocket = new WebSocket(socketUrl);
        socketRef.current = nextSocket;
        setSocket(nextSocket);

        nextSocket.addEventListener("open", () => {
            setStatus("open");
            console.info("Socket conectado");
        });

        nextSocket.addEventListener("error", () => {
            setStatus("error");
            console.error("No se pudo conectar al socket");
        });

        nextSocket.addEventListener("close", () => {
            setStatus("closed");

            if (socketRef.current === nextSocket) {
                socketRef.current = null;
                setSocket(null);
            }
        });

        return () => {
            nextSocket.close();

            if (socketRef.current === nextSocket) {
                socketRef.current = null;
                setSocket(null);
            }
        };
    }, []);

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
