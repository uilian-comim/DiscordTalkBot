import { Socket } from "socket.io";

export interface ISocketCustom extends Socket {
    username?: string;
}
