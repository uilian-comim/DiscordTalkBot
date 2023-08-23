import { IDeleteResponse } from "@/interface/channels";
import Cookies from "js-cookie";

export async function Delete(user_id: string): Promise<IDeleteResponse> {
    const token = Cookies.get("access_token");
    if (!token) return { message: "Token not found", status: 401 };
    try {
        const response = await fetch(`http://localhost:3333/api/users/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ user_id: user_id }),
        });

        const data = await response.json();

        if (response.status !== 200) {
            return {
                message: data.message,
                status: response.status,
            };
        } else {
            return {
                message: data.message,
                status: response.status,
            };
        }
    } catch (err: any) {
        console.log(`[Delete User] ${err}`);
        return {
            message: "[Delete User] Internal server error [Website]",
            status: 500,
        };
    }
}
