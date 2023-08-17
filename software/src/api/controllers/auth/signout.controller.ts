import { Request, Response } from "express";
import prisma from "src/api/database";
import InstanceManager from "src/instances";

export default async function signout(request: Request, response: Response) {
    const { bot } = request.body;
    if (!bot) return response.status(400).json({ message: "Usuário não encontrado." });

    try {
        InstanceManager.closeInstance(bot.id);
        console.log(`Bot ${bot.username} finalizado com sucesso.`);
        return response.status(200).json({ message: "Bot finalizado com sucesso." });
    } catch (err: any) {
        console.log("[sign out - auth]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
