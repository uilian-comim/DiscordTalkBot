import { Router } from "express";
import Find from "src/api/controllers/find.controller";
import GetChannels from "src/api/controllers/get.controller";
import GetMessages from "src/api/controllers/getMessages.controller";
import { TokenValidator } from "src/api/middleware";
import auth from "./auth.routes";
import channels from "./channels.routes";
import guilds from "./guilds.routes";
import users from "./users.routes";

const routes = Router();

routes.use("/api/auth", auth);
routes.use(TokenValidator);
routes.use("/api/users", users);
routes.use("/api/guilds", guilds);
routes.use("/api/channels", channels);
routes.get("/api/get", GetChannels);
routes.get("/api/find", Find);
routes.get("/api/get-messages", GetMessages);

export default routes;
