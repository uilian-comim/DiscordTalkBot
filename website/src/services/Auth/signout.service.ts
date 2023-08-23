import { IDeleteResponse } from "@/interface";
import Cookies from "js-cookie";

export async function signout(): Promise<IDeleteResponse> {
    const token = Cookies.get("access_token");
    try {
        const response = await fetch("http://localhost:3333/api/auth/signout", {
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
            };
        } else {
            return {
                message: data.message,
                status: response.status,
            };
        }
    } catch (err: any) {
        console.log(`[Signout] ${err}`);
        return {
            message: "[Signout] Internal server error [Website]",
            status: 500,
        };
    }
}
