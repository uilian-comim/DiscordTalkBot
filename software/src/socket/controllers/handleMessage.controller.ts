import { format } from "date-fns";
import InstanceManager from "src/instances";
import { ISocketCustom } from "../interface";

export async function handleMessage(socket: ISocketCustom, data: any) {
    try {
        const allInstances = InstanceManager.getAllInstances();
        const instance = allInstances.find((instance) => instance.id === data.instance_id);
        if (!instance) return;
        const channel = await instance.instance.channels.fetch(data.channel_id);
        if (!channel) return;
        if (!channel.isTextBased()) return;
        const message = await channel.send(data.message);
        const msg = {
            channel_id: data.channel_id,
            id: message.id,
            author: {
                id: message.author.id,
                name: message.author.username,
                avatar_url: message.author.avatarURL(),
            },
            content: message.content,
            createdAt: format(message.createdAt, "dd/MM/yyyy HH:mm:ss"),
        };

        socket.to(data.channel_id).emit("message", msg);
    } catch (err: any) {
        if (err.code === 50035) {
            socket.emit("error", { message: "Mensagem muito grande.", info: "Máximo de 2000 caracteres!" });
        }
    }
}
