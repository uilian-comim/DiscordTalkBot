import { format } from "date-fns";
import { Message } from "discord.js";
import { Socket } from "socket.io";
import io from "src/socket";

interface ISocketCustom extends Socket {
    username?: string;
}

export default async (message: Message) => {
    if (message.author.bot) return;
    const users = io.sockets;
    const msg = {
        id: message.id,
        content: message.content,
        author: {
            id: message.author.id,
            name: message.author.username,
            avatar_url: message.author.avatarURL() || "https://cdn.discordapp.com/embed/avatars/5.png",
        },
        createdAt: format(message.createdAt, "dd/MM/yyyy HH:mm:ss"),
    };

    users.sockets.forEach((socket: ISocketCustom) => {
        if (socket.username !== message.client.user.username) return;
        socket.rooms.forEach((room) => {
            if (room === message.channel.id) {
                socket.emit("message", msg);
            }
        });
    });
};
