import { instrument } from "@socket.io/admin-ui";
import { format } from "date-fns";
import { createServer } from "http";
import { Server } from "socket.io";
import InstanceManager from "src/instances";
import { changeRoom, handleDisconnect, handleMessage, leaveRoom } from "./controllers";
import { ISocketCustom } from "./interface";
const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:8080", "http://localhost:3000"],
        credentials: true,
    },
});

instrument(io, {
    auth: false,
    mode: "development",
});

io.use((socket: ISocketCustom, next) => {
    const username = socket.handshake.auth.username;
    const client_id = socket.handshake.auth.client_id;
    const token = socket.handshake.auth.token;
    if (!username || !client_id || !token) {
        return next(new Error("invalid username or client_id or token"));
    }
    socket.username = username;
    socket.client_id = client_id;
    socket.token = token;
    next();
});

io.on("connection", (socket: ISocketCustom) => {
    console.log(socket.username + ` Socket connected ${format(new Date(), "dd/MM/yyyy HH:mm:ss")})}`);
    const instance = InstanceManager.getInstance(socket.client_id!);
    if (!instance) {
        const newInstance = InstanceManager.createInstance(socket.client_id!);
        newInstance.instance.run(socket.token!);
    }

    socket.join("general");

    socket.join(socket.client_id!);

    socket.on("leave_room", (room_id) => leaveRoom(socket, room_id));

    socket.on("change_room", (room_id) => changeRoom(socket, room_id));

    socket.on("message", (data) => handleMessage(socket, data));

    socket.on("disconnect", () => handleDisconnect(socket));
});

export default io;
