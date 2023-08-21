import { formatISO } from "date-fns";
import { Request, Response } from "express";
import prisma from "src/api/database";
import { BotTokenValidator, GetToken, delay, instanceVerify } from "src/api/utils";
import InstanceManager from "src/instances";
import { v4 as uuidv4 } from "uuid";

export default async function signin(request: Request, response: Response) {
    const { token, keep } = request.body;
    if (!token) return response.status(400).json({ message: "Token não informado." });

    try {
        const isValide = await BotTokenValidator(token);
        if (!isValide) return response.status(400).json({ message: "Token inválido." });

        const result = await prisma.bot.findFirst({
            where: {
                token,
            },
            select: {
                id: true,
                token: true,
                username: true,
                avatar_url: true,
            },
        });

        if (!result) {
            const instance = InstanceManager.createInstance(uuidv4());

            await instance.instance.run(token);
            let bot_id = instance.instance.user?.id;
            let username = instance.instance.user?.username;

            if (!bot_id || !username) {
                await delay(10000).then(() => {
                    bot_id = instance.instance.user?.id;
                    username = instance.instance.user?.username;
                });
            }

            if (!bot_id || !username) {
                InstanceManager.closeInstance(instance.id);
                console.log("Não foi possível obter o id ou username do bot, então foi encerrado com sucesso.");
                console.log(InstanceManager.getAllInstances());
                return response.status(500).json({ message: "Não foi possível obter o id do bot." });
            }

            const result2 = await prisma.bot.findFirst({
                where: {
                    id: bot_id,
                },
                select: {
                    id: true,
                    token: true,
                    username: true,
                    avatar_url: true,
                },
            });

            if (!result2) {
                const newData = await prisma.bot.create({
                    data: {
                        id: bot_id,
                        token,
                        username,
                        avatar_url: instance.instance.user?.avatarURL() || "https://cdn.discordapp.com/embed/avatars/0.png",
                    },
                    select: {
                        id: true,
                        token: true,
                        username: true,
                        avatar_url: true,
                    },
                });

                const newInstance = InstanceManager.instanceRebuild(instance, newData.id);

                newInstance.instance.run(token);
                const access_token = GetToken(newData);

                console.log(`Bot ${newData.username} novo no sistema.`);
                return response.status(200).json({ message: "Bot iniciado com sucesso. Seja bem-vindo!", access_token, user: newData });
            }

            await prisma.bot.update({
                where: {
                    id: bot_id,
                },
                data: {
                    token,
                    last_login: formatISO(Date.now(), { format: "extended" }),
                },
            });

            const newInstance = InstanceManager.instanceRebuild(instance, bot_id);
            newInstance.instance.run(token);
            const access_token = GetToken(result2);

            console.log(`Bot ${result2.username} atualizou o token.`);
            return response.status(200).json({ message: "Bot iniciado com sucesso. Seja bem-vindo de volta!", access_token, user: result2 });
        }

        const res = await instanceVerify(result);

        if (res.isRunning) {
            InstanceManager.closeInstance(res.instance_id);
        }

        const access_token = GetToken(result, keep);

        await prisma.bot.update({
            where: {
                id: result.id,
            },
            data: {
                last_login: formatISO(Date.now(), { format: "extended" }),
            },
        });

        const instance = InstanceManager.createInstance(result.id);
        await instance.instance.run(token);

        console.log(`Bot ${result.username} iniciado.`);
        return response.status(200).json({ message: "Bot iniciado com sucesso.", access_token, user: result });
    } catch (err: any) {
        console.log("[sign in - auth]\n" + err);
        return response.status(500).json({ message: "Internal server error." });
    } finally {
        prisma.$disconnect();
    }
}
