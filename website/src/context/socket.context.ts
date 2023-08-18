"use client";

import { IAuthUser, IMessage } from "@/interface";
import { createContext, useContext } from "react";
import { Socket, io } from "socket.io-client";

interface ISetMessages {
    messages: Array<IMessage> | null;
}

interface ISocketContext {
    socket: Socket<any, any>;
    SendMessage: (message: string, user: IAuthUser, channel_id: string) => void;
    messageState: {
        messages: Array<IMessage> | null;
    };
    setMessage: (messages: IMessage) => void;
    setMessageState: ({ messages }: ISetMessages) => void;
}

export const SocketContext = createContext<ISocketContext>({
    socket: io("http://localhost:5555", {
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts: 3,
        reconnectionDelay: 1000,
    }),
    messageState: { messages: null },
    setMessage: (messages: IMessage) => {},
    setMessageState: ({ messages }: ISetMessages) => {},
    SendMessage: (message: string, user: IAuthUser, channel_id: string) => {},
});

export function useSocket() {
    const context = useContext(SocketContext);
    if (!context) throw new Error("useSocket must be used within an SocketProvider");
    return context;
}
