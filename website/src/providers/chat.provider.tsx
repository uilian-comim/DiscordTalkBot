"use client";

import { ChatContext, useAuth, useSocket } from "@/context";
import { IGuild, IUser, ProviderProps } from "@/interface";
import { GetAll, GetMessages } from "@/services";
import { Loading, Notify } from "notiflix";
import { useEffect, useMemo, useState } from "react";

export default function ChatProvider({ children }: ProviderProps) {
    const { client } = useAuth();
    const { socket, setMessageState } = useSocket();
    const [userState, setUserState] = useState<{ users: Array<IUser> | null; currentUser: IUser | null }>({ users: null, currentUser: null });
    const [guildState, setGuildState] = useState<{ guilds: Array<IGuild> | null; currentGuild: IGuild | null }>({ guilds: null, currentGuild: null });
    const [channelState, setChannelState] = useState<{ currentChannelId: string | null; oldChannelId: string | null; selectedChannelType: "user" | "guild" | null }>({
        currentChannelId: null,
        oldChannelId: null,
        selectedChannelType: null,
    });

    useEffect(() => {
        if (client) {
            refresh();
        }
    }, [client]);

    useEffect(() => {
        socket.on("newGuild", () => {
            Notify.info("Nova guilda criada", {
                clickToClose: true,
            });
            refresh();
        });
    }, [socket]);

    useEffect(() => {
        if (client && channelState.currentChannelId) {
            Loading.circle("Buscando mensagens do canal...");
            GetMessages(channelState.currentChannelId)
                .then((response) => {
                    if (response.status === 200) {
                        setMessageState({ messages: response.messages });
                        Notify.info(response.message, {
                            clickToClose: true,
                        });
                    } else {
                        Loading.remove();
                        Notify.failure(response.message, {
                            clickToClose: true,
                        });
                    }
                })
                .finally(() => Loading.remove());

            channelState.oldChannelId && socket.emit("leave_room", channelState.oldChannelId);
            socket.emit("change_room", channelState.currentChannelId);
        } else if (client && !channelState.currentChannelId) {
            setMessageState({ messages: null });
        }
    }, [channelState.currentChannelId]);

    function refresh() {
        Loading.circle("Buscando usuários e guilds", {
            clickToClose: false,
        });

        if (client) {
            GetAll()
                .then((response) => {
                    if (response.status === 200) {
                        setUserState({ users: response.users, currentUser: null });
                        setGuildState({ guilds: response.guilds, currentGuild: null });
                        Notify.success(response.message, {
                            clickToClose: true,
                        });
                    } else {
                        Notify.failure(response.message, {
                            clickToClose: true,
                        });
                    }
                    setChannelState({ currentChannelId: null, oldChannelId: null, selectedChannelType: null });
                    setMessageState({ messages: null });
                })
                .finally(() => Loading.remove());
        }
    }

    const value = useMemo(
        () => ({ userState, guildState, channelState, refresh, setChannelState, setUserState, setGuildState }),
        [userState.users, guildState.guilds, channelState],
    );

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
