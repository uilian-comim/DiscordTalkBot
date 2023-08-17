import { NextFunction, Request, Response } from "express";
import prisma from "src/api/database";
import InstanceManager from "src/instances";

export default async function ChannelValidator(request: Request, response: Response, next: NextFunction) {
    const { channel_id, bot } = request.body;

    if (!bot) return response.status(400).json({ message: "Formato incorreto." });

    try {
        const i = InstanceManager.getInstance(bot.id);
        if (!i) return response.status(400).json({ message: "Instância não encontrada. Verifique se o bot está em execução ou entre em contato com um administrador." });
        const channel = await i.instance.channels.fetch(channel_id);
        if (!channel) return response.status(500).json({ message: "Não foi possível obter o canal." });

        if (!channel.isTextBased() || channel.isDMBased()) return response.status(400).json({ message: `Canal ${channel.id} fornecido não é um canal de texto` });
        const result = await prisma.channels_Guild.findFirst({
            where: {
                AND: [
                    {
                        channel_id: channel.id,
                    },
                    {
                        guild_id: channel.guildId,
                    },
                    {
                        bot_id: bot.id,
                    },
                ],
            },
        });
        if (result) return response.status(409).json({ message: "Canal já existente no banco de dados para bot com esse id." });

        request.body.channel = channel;
        next();
    } catch (err: any) {
        console.log("[channel validator - middleware]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
