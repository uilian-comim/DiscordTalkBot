import { Message } from "discord.js";
import { NextFunction, Request, Response } from "express";
import InstanceManager from "src/instances";

export default async function UserValidator(request: Request, response: Response, next: NextFunction) {
    const { user_id, bot } = request.body;

    if (!user_id) return response.status(400).json({ message: "Formato incorreto." });

    try {
        const i = InstanceManager.getInstance(bot.id);
        if (!i) return response.status(400).json({ message: "Instância não encontrada." });
        const user = await i.instance.users.fetch(user_id);
        if (!user.username) return response.status(500).json({ message: "Não foi possível obter o nome do usuário." });
        const channel = await user.createDM();
        await channel.send("Hello!").then((m: Message) => m.delete());

        request.body.channel = channel;
        request.body.user = user;
        next();
    } catch (err: any) {
        if (err.code === 10013 || err.code === 50035) {
            console.log("[user validator - middleware]\n" + err);
            return response.status(400).json({ message: "ID fornecido não é um id de usuário válido" });
        }

        if (err.code === 50007) {
            console.log("[user validator - middleware]\n" + err);
            return response.status(403).json({
                message: "Não foi possível criar um canal privado com o usuário.",
                information:
                    "Para criar um canal privado com um usuário, ele deve estar no mesmo servidor que o bot, e também deve estar com a opção de mensagens diretas de membros de servidor ativa.",
            });
        }

        console.log("[user validator - middleware]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    }
}
