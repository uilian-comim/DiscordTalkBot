import { sign, verify } from "jsonwebtoken";

type TUser = {
    id: string;
    token: string;
    username: string;
    avatar_url: string;
};

export function GetToken(user: TUser): string {
    return sign(user, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "4h",
    });
}

export function DecodedToken(token: string): TUser {
    return verify(token, process.env.JWT_SECRET_KEY as string) as TUser;
}
