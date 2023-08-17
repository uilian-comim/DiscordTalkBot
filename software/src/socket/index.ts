import { instrument } from "@socket.io/admin-ui";
import { format } from "date-fns";
import { createServer } from "http";
import { Server } from "socket.io";
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
    if (!username) {
        return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});

io.on("connection", (socket: ISocketCustom) => {
    console.log(socket.username + ` Socket connected ${format(new Date(), "dd/MM/yyyy HH:mm:ss")})}`);
    socket.join("general");

    socket.on("leave_room", (room_id) => leaveRoom(socket, room_id));

    socket.on("change_room", (room_id) => changeRoom(socket, room_id));

    socket.on("message", (data) => handleMessage(socket, data));

    socket.on("disconnect", () => handleDisconnect(socket));
});

export default io;
