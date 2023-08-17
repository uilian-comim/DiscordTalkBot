import cors from "cors";
import express from "express";
import helmet from "helmet";
import { createServer } from "http";
import morgan from "morgan";
import routes from "./routes";

const server = express();
server.use(cors());
server.use(helmet());
server.use(morgan("combined"));
server.use(express.json());
server.use(routes);

const httpServer = createServer(server);

export default httpServer;
