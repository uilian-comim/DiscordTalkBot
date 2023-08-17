export async function BotTokenValidator(token: string) {
    try {
        const isValide = await fetch("https://discord.com/api/v10/users/@me", {
            headers: {
                Authorization: `Bot ${token}`,
            },
        });

        if (isValide.status !== 200) return false;

        return true;
    } catch (err: any) {
        throw new Error(err);
    }
}
