import { IGetChannelsResponse } from "@/interface/channels";
import Cookies from "js-cookie";

export async function Find(search: string, guilds: boolean, users: boolean): Promise<IGetChannelsResponse> {
    const token = Cookies.get("access_token");
    if (!token) return { message: "Token not found", status: 401, guilds: null, users: null, total: 0 };
    const response = await fetch(`http://localhost:3333/api/find?search=${search}&users=${users}&guilds=${guilds}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (response.status !== 200) {
        return {
            message: data.message,
            status: response.status,
            guilds: null,
            users: null,
            total: 0,
        };
    } else {
        return {
            message: data.message,
            status: response.status,
            guilds: data.guilds,
            users: data.users,
            total: data.total,
        };
    }
}
