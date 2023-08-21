import { Socket } from "socket.io";

export interface ISocketCustom extends Socket {
    username?: string;
    client_id?: string;
    token?: string;
}
