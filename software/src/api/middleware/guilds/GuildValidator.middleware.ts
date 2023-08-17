import { NextFunction, Request, Response } from "express";
import prisma from "src/api/database";

export default async function GuildValidator(request: Request, response: Response, next: NextFunction) {
    const { guild, bot } = request.body;

    if (!guild || !bot) return response.status(400).json({ message: "ID do guild ou do bot não informado." });

    try {
        const result = await prisma.guilds.findFirst({
            where: {
                AND: [
                    {
                        guild_id: guild.id,
                    },
                    {
                        bot_id: bot.id,
                    },
                ],
            },
        });
        if (result) return response.status(400).json({ message: "Guild já cadastrado." });
        next();
    } catch (err: any) {
        console.log("[guild validator - middleware]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
