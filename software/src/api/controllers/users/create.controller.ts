import { Request, Response } from "express";
import prisma from "src/api/database";

export default async function Create(request: Request, response: Response) {
    const { user_id, bot, user, channel } = request.body;

    try {
        const result = await prisma.users.findFirst({
            where: {
                channel_id: channel.id,
            },
        });
        if (result) return response.status(409).json({ message: "Canal já existente no banco de dados." });

        const data = await prisma.users.create({
            data: {
                user_id,
                channel_id: channel.id,
                name: user.username,
                avatar_url: user.avatarURL() || "https://cdn.discordapp.com/embed/avatars/0.png",
                favorite: false,
                bot_id: bot.id,
            },
            select: {
                id: true,
                name: true,
                avatar_url: true,
                channel_id: true,
                favorite: true,
                updated_at: true,
            },
        });

        return response.status(200).json({ message: "Canal criado com sucesso.", user: data });
    } catch (err: any) {
        console.log("[create - users]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
