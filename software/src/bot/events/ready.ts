import { Client } from "discord.js";
import { sign } from "jsonwebtoken";
import api from "src/bot/api";
import io from "src/socket";

export default async (client: Client) => {
    try {
        const guilds = await client.guilds.fetch();
        guilds.map(async (guild, _) => {
            const fullGuild = await client.guilds.fetch(guild.id);
            const Guild = {
                id: guild.id,
                name: guild.name,
                icon: guild.iconURL({ extension: "png" }),
            };
            const userClient = {
                id: client.user?.id,
                token: client.token,
                username: client.user?.username,
                avatar_url: client.user?.avatarURL({ extension: "png" }),
            };
            const access_token = sign(userClient, process.env.JWT_SECRET_KEY as string, {
                expiresIn: 120,
            });
            const result = await fetch(`${api}/guilds/create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ guild: Guild, bot: client.user?.id }),
            });

            const response = await result.json();

            console.log(`[${guild.name}] ${response.message}`);

            if (result.status === 200) {
                const channels = await fullGuild.channels.fetch();
                const fullChannels = await Promise.all(
                    channels.map(async (channel, _) => {
                        if (!channel) return;

                        const result2 = await fetch(`${api}/channels/create`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${access_token}`,
                            },
                            body: JSON.stringify({
                                channel_id: channel.id,
                                guild_id: response.guild_id,
                            }),
                        });

                        const response2 = await result2.json();

                        console.log(`[${channel.name}] ${response2.message}`);

                        return {
                            channel_id: channel.id,
                            channel_name: channel.name,
                            guild_id: response.guild_id,
                        };
                    }),
                );

                io.to(guild.client.user.id).emit("guild:ready", {
                    message: `Bot adicionado ao servidor: ${guild.name}.`,
                    guild: {
                        id: response.guild_id,
                        guild_id: guild.id,
                        name: guild.name,
                        avatar_url: guild.iconURL({ extension: "png" }),
                        favorite: 0,
                        created_at: new Date().toISOString(),
                        channels_guild: fullChannels,
                        bot_id: guild.client.user.id,
                    },
                });
            }
        });
        console.log("Iniciado com sucesso!");
    } catch (err: any) {
        console.log("Erro ao iniciar o bot.");
        console.log(err);
    } finally {
        console.log("Bot iniciado.");
    }
};
