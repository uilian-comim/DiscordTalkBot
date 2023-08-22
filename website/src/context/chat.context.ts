"use client";

import { IGuild, IUser } from "@/interface";
import { createContext, useContext } from "react";

interface IUserState {
    users: Array<IUser> | null;
    currentUser: IUser | null;
}

interface IGuildState {
    guilds: Array<IGuild> | null;
    currentGuild: IGuild | null;
}

interface IChannelState {
    currentChannelId: string | null;
    oldChannelId: string | null;
    selectedChannelType: "user" | "guild" | null;
    total: number;
}

interface IChatContext {
    userState: {
        users: Array<IUser> | null;
        currentUser: IUser | null;
    };
    guildState: {
        guilds: Array<IGuild> | null;
        currentGuild: IGuild | null;
    };
    channelState: {
        currentChannelId: string | null;
        oldChannelId: string | null;
        selectedChannelType: "user" | "guild" | null;
        total: number;
    };
    refresh: () => void;
    setUserState: ({ users, currentUser }: IUserState) => void;
    setGuildState: ({ guilds, currentGuild }: IGuildState) => void;
    setChannelState: ({ currentChannelId, oldChannelId, selectedChannelType, total }: IChannelState) => void;
    getMore: () => void;
}

export const ChatContext = createContext<IChatContext>({
    userState: {
        users: null,
        currentUser: null,
    },
    guildState: {
        guilds: null,
        currentGuild: null,
    },
    channelState: {
        currentChannelId: null,
        oldChannelId: null,
        selectedChannelType: null,
        total: 0,
    },
    refresh: () => {},
    setUserState: ({ users, currentUser }: IUserState) => {},
    setGuildState: ({ guilds, currentGuild }: IGuildState) => {},
    setChannelState: ({ currentChannelId, oldChannelId, selectedChannelType, total }: IChannelState) => {},
    getMore: () => {},
});

export function useChat() {
    const context = useContext(ChatContext);
    if (!context) throw new Error("useChat must be used within a ChatProvider");
    return context;
}
