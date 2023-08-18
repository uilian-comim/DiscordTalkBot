import { IUser } from "@/interface/channels";
import Cookies from "js-cookie";

interface ICreateResponse {
    status: number;
    message: string;
    information?: string;
    user: IUser | null;
}

export async function Create(user_id: string): Promise<ICreateResponse> {
    const token = Cookies.get("access_token");
    if (!token) {
        return {
            message: "Token not found",
            status: 401,
            information: "",
            user: null,
        };
    }
    const response = await fetch(`http://localhost:3333/api/users/create`, {
        method: "POST",
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
            information: data.information,
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
