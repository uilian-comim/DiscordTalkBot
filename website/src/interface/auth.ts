export interface IAuthUser {
    id: string;
    username: string;
    avatar_url: string;
    token: string;
}

export interface IAuthResponse {
    status: number;
    message: string;
    user: IAuthUser | null;
    access_token: string | null;
}
