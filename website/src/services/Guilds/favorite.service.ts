import { IFavoriteGuildResponse } from "@/interface";
import Cookies from "js-cookie";

export async function FavoriteGuild(guild_id: string): Promise<IFavoriteGuildResponse> {
    const token = Cookies.get("access_token");
    if (!token) return { message: "Token not found", status: 401, guild: null };

    const response = await fetch(`http://localhost:3333/api/guilds/favorite`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ guild_id: guild_id }),
    });

    const data = await response.json();

    if (response.status !== 200) {
        return {
            message: data.message,
            status: response.status,
            guild: null,
        };
    } else {
        return {
            message: data.message,
            status: response.status,
            guild: data.guild,
        };
    }
}
