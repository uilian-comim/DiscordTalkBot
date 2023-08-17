import { Request, Response } from "express";
import prisma from "src/api/database";
import InstanceManager from "src/instances";

export default async function Delete(request: Request, response: Response) {
    const { bot, user } = request.body;

    try {
        const channel = await InstanceManager.getInstance(bot.id)?.instance.channels.fetch(user.channel_id);
        if (!channel) return response.status(404).json({ error: "Canal não encontrado." });

        await channel.delete();
        await prisma.users.delete({
            where: {
                id: user.id,
            },
        });

        return response.status(200).json({ message: `Canal com o usuário ${user.name} deletado com sucesso.` });
    } catch (err: any) {
        console.log("[delete - users]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
