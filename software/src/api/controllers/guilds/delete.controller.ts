import { Request, Response } from "express";
import prisma from "src/api/database";
import InstanceManager from "src/instances";

export default async function Delete(request: Request, response: Response) {
    const { bot, guild } = request.body;

    try {
        const clientGuild = await InstanceManager.getInstance(bot.id)?.instance.guilds.fetch(guild.guild_id);
        if (!clientGuild) return response.status(404).json({ message: "Guild não encontrado." });
        await clientGuild.leave();

        await prisma.channels_Guild.deleteMany({
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

        await prisma.guilds.delete({
            where: {
                id: guild.id,
            },
        });

        return response.status(200).json({ message: `Guild ${guild.name} deletado com sucesso.` });
    } catch (err: any) {
        console.log("[delete - guilds]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
