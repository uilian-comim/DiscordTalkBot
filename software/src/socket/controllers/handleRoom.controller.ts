import { ISocketCustom } from "../interface";

export function changeRoom(socket: ISocketCustom, room_id: any) {
    console.log(`O usuário ${socket.username} se conectou na sala ${room_id}`);
    socket.join(room_id);
}

export function leaveRoom(socket: ISocketCustom, room_id: any) {
    console.log(`O usuário ${socket.id} se desconectou da sala ${room_id}`);
    socket.leave(room_id);
}
