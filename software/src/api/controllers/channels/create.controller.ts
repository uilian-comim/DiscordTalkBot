import { Request, Response } from "express";
import prisma from "src/api/database";

export default async function Create(request: Request, response: Response) {
    const { bot, channel, guild_id } = request.body;

    try {
        await prisma.channels_Guild.create({
            data: {
                channel_id: channel.id,
                guild_id,
                bot_id: bot.id,
                channel_name: channel.name,
            },
        });

        return response.status(200).json({ message: `Canal ${channel.name} postado com sucesso!` });
    } catch (err: any) {
        console.log("[create - channels]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
