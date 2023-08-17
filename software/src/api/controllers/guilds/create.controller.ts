import { Request, Response } from "express";
import prisma from "src/api/database";

export default async function Create(request: Request, response: Response) {
    const { guild, bot } = request.body;

    try {
        const newGuild = {
            guild_id: guild.id,
            name: guild.name,
            avatar_url: guild.icon,
        };
        const result = await prisma.guilds.create({
            data: {
                guild_id: newGuild.guild_id,
                name: newGuild.name,
                avatar_url: newGuild.avatar_url,
                favorite: false,
                bot_id: bot.id,
            },
        });

        return response.status(200).json({ message: `Foi postado com sucesso o servidor ${guild.name}.`, guild_id: result.id });
    } catch (err: any) {
        console.log("[create - guilds]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
