import { IGetChannelsResponse } from "@/interface/channels";
import Cookies from "js-cookie";

export async function GetChannels(guildsLoaded: number = 0, usersLoaded: number = 0): Promise<IGetChannelsResponse> {
    const token = Cookies.get("access_token");
    if (!token) return { message: "Token not found", status: 401, guilds: null, users: null, total: 0 };
    try {
        const response = await fetch(`http://localhost:3333/api/get?usersLoaded=${usersLoaded}&guildsLoaded=${guildsLoaded}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.status !== 200 && response.status !== 204) {
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
    } catch (err: any) {
        console.log(`[Get Channels] ${err}`);
        return {
            message: "[Get Channels] Internal server error [Website]",
            status: 500,
            guilds: null,
            users: null,
            total: 0,
        };
    }
}
