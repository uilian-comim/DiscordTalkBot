import { Guild } from "discord.js";
import { sign } from "jsonwebtoken";
import io from "src/socket";
import api from "../api";

export default async (guild: Guild) => {
    try {
        const Guild = {
            id: guild.id,
            name: guild.name,
            icon: guild.iconURL({ extension: "png" }),
        };
        const userClient = {
            id: guild.client.user.id,
            token: guild.client.token,
            username: guild.client.user.username,
            avatar_url: guild.client.user.avatarURL({ extension: "png" }),
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
            body: JSON.stringify({ guild: Guild, bot: guild.client.user.id }),
        });

        if (result.status !== 200) return console.log("[guildCreate] - Erro ao criar o servidor.");
        const response = await result.json();
        console.log(`[${guild.name}] ${response.message}`);
        const channels = await guild.channels.fetch();
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

        io.to(guild.client.user.id).emit("guild:created", {
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
    } catch (err: any) {
        console.log("Erro ao iniciar o bot.");
        console.log(err);
    }
};
