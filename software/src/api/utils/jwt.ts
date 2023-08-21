import { add } from "date-fns";
import { decode, sign, verify } from "jsonwebtoken";

type TUser = {
    id: string;
    token: string;
    username: string;
    avatar_url: string;
    keep?: boolean;
};

interface IDecodedToken extends TUser {
    iat: number;
    exp: number;
}

export function GetToken(user: TUser, keep?: boolean): string {
    return sign(user, process.env.JWT_SECRET_KEY as string, {
        expiresIn: keep ? "7d" : "4h",
    });
}

export function DecodedToken(token: string): TUser {
    verify(token, process.env.JWT_SECRET_KEY as string);
    const decodedToken = decode(token) as IDecodedToken;
    if (new Date(decodedToken.exp * 1000) > add(new Date(), { hours: 4 })) {
        const newUser = {
            ...decodedToken,
            keep: true,
        };

        return newUser;
    }

    return decode(token) as TUser;
}
