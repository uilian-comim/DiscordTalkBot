import { IAuthResponse } from "@/interface";

export async function refresh(token: string): Promise<IAuthResponse> {
    try {
        const response = await fetch("http://localhost:3333/api/auth/refresh", {
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
                user: null,
                access_token: null,
            };
        } else {
            return {
                message: data.message,
                status: response.status,
                user: data.user,
                access_token: data.access_token,
            };
        }
    } catch (err: any) {
        console.log(`[Refresh] ${err}`);
        return {
            message: "[Refresh] Internal server error [Website]",
            status: 500,
            user: null,
            access_token: null,
        };
    }
}
