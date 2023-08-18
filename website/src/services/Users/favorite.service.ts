import { IFavoriteUserResponse } from "@/interface/channels";
import Cookies from "js-cookie";

export async function Favorite(user_id: string): Promise<IFavoriteUserResponse> {
    const token = Cookies.get("access_token");
    if (!token) return { message: "Token not found", status: 401, user: null };
    const response = await fetch(`http://localhost:3333/api/users/favorite`, {
        method: "PUT",
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
            user: null,
        };
    } else {
        return {
            message: data.message,
            status: response.status,
            user: data.user,
        };
    }
}
