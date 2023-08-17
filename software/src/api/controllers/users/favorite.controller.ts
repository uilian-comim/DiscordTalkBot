import { formatISO } from "date-fns";
import { Request, Response } from "express";
import prisma from "src/api/database";

export default async function Favorite(request: Request, response: Response) {
    const { user } = request.body;
    try {
        const newUser = await prisma.users.update({
            where: {
                id: user.id,
            },
            data: {
                favorite: !user.favorite,
                updated_at: formatISO(Date.now(), { format: "extended" }),
            },
        });

        return response.status(200).json({ message: `Usuário ${user.favorite ? "desfavoritado" : "favoritado"} com sucesso.`, user: newUser });
    } catch (err: any) {
        console.log("[favorite - users]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
