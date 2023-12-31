import { IAuthResponse } from "@/interface";

export async function signin(token: string, keep?: boolean): Promise<IAuthResponse> {
    try {
        const response = await fetch("http://localhost:3333/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, keep }),
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
        console.log(`[Signin] ${err}`);
        return {
            message: "[Signin] Internal server error [Website]",
            status: 500,
            user: null,
            access_token: null,
        };
    }
}
