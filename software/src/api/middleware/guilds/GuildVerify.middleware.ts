import { NextFunction, Request, Response } from "express";
import prisma from "src/api/database";

export default async function GuildVerify(request: Request, response: Response, next: NextFunction) {
    const { bot, guild_id } = request.body;

    if (!guild_id) return response.status(400).json({ message: "Formato incorreto." });

    try {
        const guild = await prisma.guilds.findFirst({
            where: {
                AND: [
                    {
                        id: guild_id,
                    },
                    {
                        bot_id: bot.id,
                    },
                ],
            },
        });

        if (!guild) return response.status(404).json({ message: "Guild não encontrado." });

        request.body.guild = guild;
        next();
    } catch (err: any) {
        console.log("[guild verify - middleware]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
