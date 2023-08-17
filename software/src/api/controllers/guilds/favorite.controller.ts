import { Request, Response } from "express";
import prisma from "src/api/database";

export default async function Favorite(request: Request, response: Response) {
    const { guild } = request.body;
    try {
        const newGuild = await prisma.guilds.update({
            where: {
                id: guild.id,
            },
            data: {
                favorite: !guild.favorite,
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
        });

        return response.status(200).json({ message: `Servidor ${guild.favorite ? "desfavoritado" : "favoritado"} com sucesso.`, guild: newGuild });
    } catch (err: any) {
        console.log("[favorite - guilds]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
