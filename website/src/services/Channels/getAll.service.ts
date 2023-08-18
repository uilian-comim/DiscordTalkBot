import { IGetAllResponse } from "@/interface/channels";
import Cookies from "js-cookie";

export async function GetAll(): Promise<IGetAllResponse> {
    const token = Cookies.get("access_token");
    if (!token) return { message: "Token not found", status: 401, guilds: null, users: null };
    const response = await fetch("http://localhost:3333/api/get-all", {
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
        };
    } else {
        return {
            message: data.message,
            status: response.status,
            guilds: data.guilds,
            users: data.users,
        };
    }
}
