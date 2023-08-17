import { Router } from "express";
import { Create, Delete, Favorite } from "src/api/controllers/guilds";
import { GuildValidator, GuildVerify } from "src/api/middleware";

const guilds = Router();

guilds.post("/create", GuildValidator, Create);
guilds.delete("/delete", GuildVerify, Delete);
guilds.put("/favorite", GuildVerify, Favorite);

export default guilds;
