import { Request, Response } from "express";
import { GetToken } from "src/api/utils";

export default async function refresh(request: Request, response: Response) {
    const { bot, keep } = request.body;
    try {
        const refresh_token = GetToken(bot, keep);

        return response.status(200).json({ message: "Token atualizado com sucesso.", access_token: refresh_token, user: bot });
    } catch (err: any) {
        console.log("[refresh - auth]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    }
}
