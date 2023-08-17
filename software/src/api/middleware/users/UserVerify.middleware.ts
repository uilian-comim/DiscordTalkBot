import { NextFunction, Request, Response } from "express";
import prisma from "src/api/database";

export default async function UserVerify(request: Request, response: Response, next: NextFunction) {
    const { bot, user_id } = request.body;

    if (!user_id) return response.status(400).json({ message: "Formato incorreto." });

    try {
        const user = await prisma.users.findFirst({
            where: {
                AND: [
                    {
                        id: user_id,
                    },
                    {
                        bot_id: bot.id,
                    },
                ],
            },
        });

        if (!user) return response.status(404).json({ message: "Usuário não encontrado." });

        request.body.user = user;
        next();
    } catch (err: any) {
        console.log("[user verify - middleware]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
