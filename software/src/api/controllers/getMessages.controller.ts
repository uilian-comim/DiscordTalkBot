import { format } from "date-fns";
import { Request, Response } from "express";
import prisma from "src/api/database";
import InstanceManager from "src/instances";

export default async function GetMessages(request: Request, response: Response) {
    const { bot } = request.body;
    const { channelId } = request.query;

    if (!channelId) {
        return response.status(400).json({ message: "Não foi possível recuperar o ID do canal." });
    }

    try {
        const instance = InstanceManager.getInstance(bot.id);
        if (!instance) {
            return response.status(400).json({ message: "Não foi possível encontrar a instância do bot." });
        }

        const result1 = await prisma.users.findFirst({
            where: {
                AND: [
                    {
                        bot_id: bot.id,
                    },
                    {
                        channel_id: channelId.toString(),
                    },
                ],
            },
        });

        if (result1) {
            const user = await instance.instance.users.fetch(result1.user_id);
            if (!user) {
                return response.status(400).json({ message: "Não foi possível encontrar o usuário." });
            }

            const messages = await (await user.createDM()).messages.fetch({ limit: 20 });

            const newMessages = messages.map((message) => {
                return {
                    id: message.id,
                    content: message.content,
                    createdAt: format(message.createdAt, "dd/MM/yyyy HH:mm:ss"),
                    author: {
                        id: message.author.id,
                        name: message.author.username,
                        avatar_url: message.author.avatarURL() || "https://cdn.discordapp.com/embed/avatars/5.png",
                    },
                };
            });

            const newMessages2 = newMessages.reverse();

            return response.status(200).json({ message: "Encontrado com sucesso.", messages: newMessages2 });
        }

        const result2 = await prisma.channels_Guild.findFirst({
            where: {
                AND: [
                    {
                        bot_id: bot.id,
                    },
                    {
                        channel_id: channelId.toString(),
                    },
                ],
            },
        });

        if (result2) {
            const channel = await instance.instance.channels.fetch(channelId.toString());
            if (!channel) {
                return response.status(400).json({ message: "Não foi possível encontrar o canal no cache do bot" });
            }

            if (!channel.isTextBased()) {
                return response.status(400).json({ message: "O canal não é de texto." });
            }

            const messages = await channel.messages.fetch({
                limit: 20,
            });
            const newMessages = messages.map((message) => {
                return {
                    id: message.id,
                    content: message.content,
                    createdAt: format(message.createdAt, "dd/MM/yyyy HH:mm:ss"),
                    author: {
                        id: message.author.id,
                        name: message.author.username,
                        avatar_url: message.author.avatarURL() || "https://cdn.discordapp.com/embed/avatars/5.png",
                    },
                };
            });

            return response.status(200).json({ message: "Encontrado com sucesso.", messages: newMessages.reverse() });
        }

        return response.status(400).json({ message: "Não foi possível encontrar o canal." });
    } catch (err: any) {
        console.log("[find]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
