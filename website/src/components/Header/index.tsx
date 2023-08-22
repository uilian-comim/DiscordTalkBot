"use client";

import { useChat } from "@/context";
import { DeleteGuild, FavoriteGuild } from "@/services/Guilds";
import { Delete, Favorite } from "@/services/Users";
import { Confirm, Notify } from "notiflix";
import { AiOutlineDelete, AiOutlineStar } from "react-icons/ai";
import { ChannelInformation } from "./ChannelInformation";
import { DesktopActionButtons } from "./DesktopActionButton";
import { MobileActionButtons } from "./MobileActionButton";

export function Header() {
    const { userState, guildState, channelState, setChannelState, setUserState, setGuildState } = useChat();

    const usersButton = [
        {
            icon: <AiOutlineDelete />,
            text: "Deletar usuário",
            onclick: () =>
                Confirm.show(
                    "Delete confirm",
                    `Deseja mesmo deletar o usuário ${userState.currentUser?.name}?`,
                    "Confirmar",
                    "Cancelar",
                    () => {
                        if (!userState.currentUser) return;
                        Delete(userState.currentUser.id).then((response) => {
                            if (response.status === 200 && userState.users) {
                                const userIndex = userState.users.findIndex((user) => user.id === userState.currentUser?.id);
                                if (userIndex >= 0) {
                                    const newUsers = [...userState.users];
                                    newUsers.splice(userIndex, 1);
                                    if (newUsers.length > 0) {
                                        setUserState({ currentUser: null, users: newUsers });
                                        setChannelState({
                                            total: guildState.guilds?.length! + newUsers.length,
                                            oldChannelId: channelState.currentChannelId,
                                            currentChannelId: null,
                                            selectedChannelType: null,
                                        });
                                    } else {
                                        setUserState({ currentUser: null, users: null });
                                        setChannelState({ total: 0, oldChannelId: channelState.currentChannelId, currentChannelId: null, selectedChannelType: null });
                                    }
                                    Notify.success(response.message, {
                                        clickToClose: true,
                                    });
                                }
                            } else {
                                Notify.failure(response.message, {
                                    clickToClose: true,
                                });
                            }
                        });
                    },
                    () =>
                        Notify.info("Cancelado com sucesso!", {
                            clickToClose: true,
                        }),
                ),
        },
        {
            icon: <AiOutlineStar />,
            text: userState.currentUser?.favorite ? "Remover favorito" : "Favoritar usuário",
            onclick: () =>
                Confirm.show(
                    "Favorite confirm",
                    `Deseja mesmo ${userState.currentUser?.favorite ? "desfavoritar" : "favoritar"} o usuário ${userState.currentUser?.name}?`,
                    "Confirmar",
                    "Cancelar",
                    () => {
                        if (!userState.currentUser) return;
                        Favorite(userState.currentUser.id).then((response) => {
                            if (response.status === 200 && userState.users && response.user) {
                                const userIndex = userState.users.findIndex((user) => user.id === response.user?.id);
                                if (userIndex >= 0) {
                                    const newUsers = [...userState.users];
                                    newUsers[userIndex] = response.user;
                                    setUserState({ currentUser: response.user, users: newUsers });

                                    Notify.success(response.message, {
                                        clickToClose: true,
                                    });
                                }
                            } else {
                                Notify.failure(response.message, {
                                    clickToClose: true,
                                });
                            }
                        });
                    },
                    () =>
                        Notify.info("Cancelado com sucesso!", {
                            clickToClose: true,
                        }),
                ),
        },
    ];
    const guildsButton = [
        {
            icon: <AiOutlineDelete />,
            text: "Deletar servidor",
            onclick: () =>
                Confirm.show(
                    "Delete confirm",
                    `Deseja mesmo deletar o servidor ${guildState.currentGuild?.name}?`,
                    "Confirmar",
                    "Cancelar",
                    () => {
                        if (!guildState.currentGuild) return;
                        DeleteGuild(guildState.currentGuild.id).then((response) => {
                            if (response.status === 200 && guildState.guilds) {
                                const guildIndex = guildState.guilds.findIndex((guild) => guild.id === guildState.currentGuild?.id);
                                if (guildIndex >= 0) {
                                    const newGuilds = [...guildState.guilds];
                                    newGuilds.splice(guildIndex, 1);
                                    if (newGuilds.length > 0) {
                                        setGuildState({ currentGuild: null, guilds: newGuilds });
                                        setChannelState({
                                            total: newGuilds.length + userState.users?.length!,
                                            oldChannelId: channelState.currentChannelId,
                                            currentChannelId: null,
                                            selectedChannelType: null,
                                        });
                                    } else {
                                        setGuildState({ currentGuild: null, guilds: null });
                                        setChannelState({ total: 0, oldChannelId: channelState.currentChannelId, currentChannelId: null, selectedChannelType: null });
                                    }
                                    Notify.success(response.message, {
                                        clickToClose: true,
                                    });
                                } else {
                                    Notify.warning("Erro ao apagar dados, clique em recarregar para atualizar.", {
                                        clickToClose: true,
                                    });
                                }
                            } else {
                                Notify.failure(response.message, {
                                    clickToClose: true,
                                });
                            }
                        });
                    },
                    () =>
                        Notify.info("Cancelado com sucesso!", {
                            clickToClose: true,
                        }),
                ),
        },
        {
            icon: <AiOutlineStar />,
            text: guildState.currentGuild?.favorite ? "Remover favorito" : "Favoritar servidor",
            onclick: () =>
                Confirm.show(
                    "Favorite confirm",
                    `Deseja mesmo ${guildState.currentGuild?.favorite ? "desfavoritar" : "favoritar"} o servidor ${guildState.currentGuild?.name}?`,
                    "Confirmar",
                    "Cancelar",
                    () => {
                        if (!guildState.currentGuild) return;
                        FavoriteGuild(guildState.currentGuild.id).then((response) => {
                            if (response.status === 200 && response.guild && guildState.guilds) {
                                const guildIndex = guildState.guilds.findIndex((guild) => guild.id === response.guild?.id);
                                if (guildIndex >= 0) {
                                    const newGuilds = [...guildState.guilds];
                                    newGuilds[guildIndex] = response.guild;
                                    setGuildState({ currentGuild: response.guild, guilds: newGuilds });

                                    Notify.success(response.message, {
                                        clickToClose: true,
                                    });
                                }
                            } else {
                                Notify.failure(response.message, {
                                    clickToClose: true,
                                });
                            }
                        });
                    },
                    () =>
                        Notify.info("Cancelado com sucesso!", {
                            clickToClose: true,
                        }),
                ),
        },
    ];

    return (
        <header className="w-full h-20 bg-base-300 p-2 pl-20 fixed top-0 right-0 md:pl-48 lg:pl-56 z-10">
            <div className="navbar items-center justify-between bg-base-300">
                <ChannelInformation />
                <MobileActionButtons guildsButtons={guildsButton} usersButtons={usersButton} />
                <DesktopActionButtons guildsButtons={guildsButton} usersButtons={usersButton} />
            </div>
        </header>
    );
}
