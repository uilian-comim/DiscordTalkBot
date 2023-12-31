import { NextFunction, Request, Response } from "express";
import prisma from "src/api/database";
import { DecodedToken, GetTokenInformation } from "src/api/utils";
import InstanceManager from "src/instances";

export default async function TokenValidator(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;
    try {
        if (!authorization || typeof authorization !== "string" || !authorization.startsWith("Bearer ")) {
            return response.status(400).json({ message: "Formato incorreto." });
        }
        const access_token = authorization.split(" ")[1];
        const user = DecodedToken(access_token);
        const result = await prisma.bot.findFirst({
            where: {
                AND: [{ id: user.id }, { token: user.token }],
            },
            select: {
                id: true,
                token: true,
                username: true,
                avatar_url: true,
            },
        });

        if (!result) {
            return response.status(404).json({ message: "User not found." });
        }

        request.body.bot = result;
        request.body.keep = user.keep;
        next();
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            try {
                const user = GetTokenInformation(request.headers.authorization?.split(" ")[1]!);
                InstanceManager.closeInstance(user.id);
            } catch (err: any) {
                console.log(err);
            }
            return response.status(401).json({ message: "Token expirado." });
        }
        if (err.name === "JsonWebTokenError") {
            return response.status(401).json({ message: "Token inválido." });
        }

        console.log("[token validator - middleware]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
