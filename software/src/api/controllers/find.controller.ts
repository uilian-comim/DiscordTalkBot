import { Request, Response } from "express";
import prisma from "src/api/database";

export default async function Find(request: Request, response: Response) {
    const { bot } = request.body;
    const { search, users, guilds } = request.query;

    if (!search || typeof search != "string" || !users || !guilds) {
        return response.status(400).json({ message: "Você precisa fornecer o nome ou id de um usuário ou servidor para buscar." });
    }

    if (users === "false" && guilds === "false") {
        return response.status(400).json({ message: "Você precisa fornecer o tipo de busca, se é por usuários, servidores ou ambos." });
    }

    try {
        const result1 = await prisma.users.findMany({
            where: {
                AND: [
                    {
                        bot_id: bot.id,
                    },
                    {
                        OR: [
                            {
                                name: {
                                    contains: search,
                                },
                            },
                            {
                                channel_id: {
                                    contains: search,
                                },
                            },
                            {
                                user_id: {
                                    contains: search,
                                },
                            },
                        ],
                    },
                ],
            },
        });

        const result2 = await prisma.guilds.findMany({
            where: {
                AND: [
                    {
                        bot_id: bot.id,
                    },
                    {
                        OR: [
                            {
                                name: {
                                    contains: search,
                                },
                            },
                            {
                                id: search,
                            },
                        ],
                    },
                ],
            },
            include: {
                channels_guild: {
                    select: {
                        channel_id: true,
                        channel_name: true,
                        guild_id: true,
                    },
                    orderBy: {
                        channel_name: "asc",
                    },
                },
            },
            orderBy: {
                name: "asc",
            },
        });

        if (result1.length <= 0 && result2.length <= 0) {
            return response.status(404).json({ message: "Não foi encontrado canais ou guilds com esses dados." });
        }

        if (users === "true" && guilds === "false") {
            if (result1.length <= 0) return response.status(404).json({ message: "Não foi encontrado usuários com esses dados." });
            return response.status(200).json({ message: "Encontrado com sucesso.", users: result1 });
        } else if (users === "false" && guilds === "true") {
            if (result2.length <= 0) return response.status(404).json({ message: "Não foi encontrado guilds com esses dados." });
            return response.status(200).json({ message: "Encontrado com sucesso.", guilds: result2 });
        }
        return response.status(200).json({ message: "Encontrado com sucesso.", users: result1, guilds: result2 });
    } catch (err: any) {
        console.log("[find]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
