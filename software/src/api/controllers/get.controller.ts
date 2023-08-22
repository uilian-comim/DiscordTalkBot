import { Request, Response } from "express";
import prisma from "src/api/database";

export default async function GetChannels(request: Request, response: Response) {
    const { bot, data } = request.body;
    const { guildsLoaded, usersLoaded } = request.query;

    try {
        const users = await prisma.users.findMany({
            where: {
                bot_id: bot.id,
            },
            skip: Number(usersLoaded) > 3 ? Number(usersLoaded) : 0,
            take: 4,
        });

        const guilds = await prisma.guilds.findMany({
            where: {
                bot_id: bot.id,
            },
            include: {
                channels_guild: {
                    orderBy: {
                        channel_name: "asc",
                    },
                    select: {
                        channel_id: true,
                        channel_name: true,
                        guild_id: true,
                    },
                },
            },
            orderBy: {
                name: "asc",
            },
            skip: Number(guildsLoaded) > 3 ? Number(guildsLoaded) : 0,
            take: 4,
        });

        const totalGuilds = await prisma.guilds.count({
            where: {
                bot_id: bot.id,
            },
        });
        const totalUsers = await prisma.users.count({
            where: {
                bot_id: bot.id,
            },
        });
        const total = totalGuilds + totalUsers;

        const result = [...guilds, ...users];

        if (!result || result.length <= 0) return response.status(404).json({ message: "Não existe canais para serem recuperados." });

        if (data) return response.status(200).json({ message: `Canal privado criado com sucesso.`, guilds, users });

        return response.status(200).json({ message: `Um total de ${result.length} usuário(s)/guild(s) foi recuperado com sucesso do banco de dados.`, guilds, users, total });
    } catch (err: any) {
        console.log("[get all]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
