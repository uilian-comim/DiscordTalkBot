import { format } from "date-fns";
import { ISocketCustom } from "../interface";

export function handleDisconnect(socket: ISocketCustom) {
    console.log(`${socket.username} - Socket disconnected. - ${format(new Date(), "dd/MM/yyyy HH:mm:ss")}`);
}
