"use client";

import { ChatContext, useAuth, useSocket } from "@/context";
import { IGuild, IUser, ProviderProps } from "@/interface";
import { GetChannels, GetMessages } from "@/services";
import { Loading, Notify } from "notiflix";
import { useEffect, useMemo, useState } from "react";

export default function ChatProvider({ children }: ProviderProps) {
    const { client } = useAuth();
    const { socket, setMessageState } = useSocket();
    const [userState, setUserState] = useState<{ users: Array<IUser> | null; currentUser: IUser | null }>({ users: null, currentUser: null });
    const [guildState, setGuildState] = useState<{ guilds: Array<IGuild> | null; currentGuild: IGuild | null }>({ guilds: null, currentGuild: null });
    const [channelState, setChannelState] = useState<{ currentChannelId: string | null; oldChannelId: string | null; selectedChannelType: "user" | "guild" | null; total: number }>(
        {
            currentChannelId: null,
            oldChannelId: null,
            selectedChannelType: null,
            total: 0,
        },
    );

    useEffect(() => {
        if (client) {
            refresh();
        }
    }, [client]);

    useEffect(() => {
        socket.on("guild:created", (data: any): void => {
            if (client) {
                const guilds = guildState.guilds ? [...guildState.guilds!, data.guild] : [data.guild];
                setGuildState({ guilds, currentGuild: guildState.currentGuild });
                setChannelState({ ...channelState, total: channelState.total + 1 });
                Notify.info(data.message, {
                    clickToClose: true,
                    pauseOnHover: true,
                });
            } else {
                Notify.info(
                    `O bot foi adicionado ao servidor: ${data.guild.name}, porém não foi possível recuperar o login, atualize os canais ou busque pelo servidor para poder enviar mensagem no mesmo.`,
                    {
                        clickToClose: true,
                        pauseOnHover: true,
                    },
                );
            }
        });
    }, []);

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
            GetChannels()
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
                    setChannelState({ currentChannelId: null, oldChannelId: null, selectedChannelType: null, total: response.total });
                    setMessageState({ messages: null });
                })
                .finally(() => Loading.remove());
        }
    }

    function getMore() {
        Loading.circle("Buscando usuários e guilds", {
            clickToClose: false,
        });

        if (client && guildState.guilds && userState.users) {
            GetChannels(guildState.guilds.length, userState.users.length)
                .then((response) => {
                    if (response.status === 200 && userState.users && guildState.guilds) {
                        const users = [...userState.users, ...response.users?.filter((user) => !userState.users?.find((u) => u.id === user.id))!];
                        const guilds = [...guildState.guilds, ...response.guilds?.filter((guild) => !guildState.guilds?.find((g) => g.guild_id === guild.guild_id))!];
                        setUserState({ users, currentUser: null });
                        setGuildState({ guilds, currentGuild: null });
                        Notify.success(response.message, {
                            clickToClose: true,
                        });
                    } else {
                        Notify.failure(response.message, {
                            clickToClose: true,
                        });
                    }
                    setChannelState({ currentChannelId: null, oldChannelId: null, selectedChannelType: null, total: response.total });
                    setMessageState({ messages: null });
                })
                .finally(() => Loading.remove());
        }
    }

    const value = useMemo(
        () => ({ userState, guildState, channelState, refresh, setChannelState, setUserState, setGuildState, getMore }),
        [userState.users, guildState.guilds, channelState],
    );

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
