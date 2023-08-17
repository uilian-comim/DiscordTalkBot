import { format } from "date-fns";
import dotenv from "dotenv";
import server from "src/api";
import io from "./socket";
dotenv.config();

const APIPort = process.env.API_PORT || 3333;
const SocketPort = process.env.SOCKET_PORT || "5555";

io.listen(parseInt(SocketPort, 10));
console.log(`[${format(new Date(), "HH:mm:ss")}] Socket is running on port ${SocketPort}`);
server.listen(APIPort, () => console.log(`[${format(new Date(), "HH:mm:ss")}] Server is running on port ${APIPort}`));
