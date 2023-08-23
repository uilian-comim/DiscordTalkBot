import { IGetMessagesResponse } from "@/interface";
import Cookies from "js-cookie";

export async function GetMessages(channelId: string | null): Promise<IGetMessagesResponse> {
    if (!channelId) return { message: "No channel id", status: 400, messages: null };
    const token = Cookies.get("access_token");
    if (!token) return { message: "Token not found", status: 401, messages: null };
    try {
        const response = await fetch(`http://localhost:3333/api/get-messages?channelId=${channelId}`, {
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
                messages: null,
            };
        } else {
            return {
                message: data.message,
                status: response.status,
                messages: data.messages,
            };
        }
    } catch (err: any) {
        console.log(`[Get Messages] ${err}`);
        return {
            message: "[Get Messages] Internal server error [Website]",
            status: 500,
            messages: null,
        };
    }
}
