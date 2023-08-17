import { Guild } from "discord.js";
import { sign } from "jsonwebtoken";
import { Socket } from "socket.io";
import io from "src/socket";
import api from "../api";

interface ISocketCustom extends Socket {
    username?: string;
}

export default async (guild: Guild) => {
    try {
        const access_token = sign(
            { id: guild.client.user?.id, token: guild.client.token, username: guild.client.user?.username, avatar_url: guild.client.user?.avatarURL() },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: 120,
            },
        );
        const result = await fetch(`${api}/guilds/create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ guild: Guild, bot: guild.client.user?.id }),
        });

        const response = await result.json();

        console.log(`[${guild.name}] ${response.message}`);

        if (result.status === 200) {
            const channels = await guild.channels.fetch();
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
            });
        }

        io.emit("newGuild");
        console.log("Iniciado com sucesso!");
    } catch (err: any) {
        console.log("Erro ao iniciar o bot.");
        console.log(err);
    }
};
