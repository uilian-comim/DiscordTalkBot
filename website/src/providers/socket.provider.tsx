"use client";

import { SocketContext, useAuth } from "@/context";
import { IAuthUser, IMessage, ProviderProps } from "@/interface";
import { onConnect, onDisconnect } from "@/socket";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Notify } from "notiflix";
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:5555", {
    autoConnect: false,
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelay: 1000,
});

export default function SocketProvider({ children }: ProviderProps) {
    const { client } = useAuth();
    const [messageState, setMessageState] = useState<{ messages: Array<IMessage> | null }>({ messages: null });
    const router = useRouter();

    useEffect(() => {
        if (client && !socket.connected) {
            socket.auth = { username: client.username, client_id: client.id, token: client.token };
            socket.connect();
        }

        if (!client && socket.connected) {
            socket.disconnect();
        }

        return () => {
            socket.disconnect();
        };
    }, [client]);

    useEffect(() => {
        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("message", (data) => {
            setMessage(data);
        });
        socket.on("instance:destroy", (data) => {
            Notify.warning(data.message, {
                clickToClose: true,
                pauseOnHover: true,
            });
            socket.disconnect();
            Cookies.remove("access_token");
            router.push("/");
        });
        socket.on("error", (error) => {
            Notify.failure(error.message, {
                clickToClose: true,
                pauseOnHover: true,
            });
            Notify.info(error.info, {
                clickToClose: true,
                pauseOnHover: true,
            });
        });
    }, [socket]);

    function setMessage(message: IMessage) {
        setMessageState(({ messages }) => {
            const newMessages = messages ? [...messages, message] : [message];
            return { messages: newMessages };
        });
    }

    function SendMessage(message: string, user: IAuthUser, channel_id: string) {
        if (!channel_id)
            return Notify.failure("Please select a channel", {
                clickToClose: true,
            });
        const msg = {
            message,
            channel_id,
            instance_id: user.id,
        };
        socket.emit("message", msg);
    }

    const value = useMemo(() => ({ socket, SendMessage, setMessage, messageState, setMessageState }), [messageState.messages]);

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}
