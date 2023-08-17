import { Router } from "express";
import { Create } from "src/api/controllers/channels";
import { ChannelValidator } from "src/api/middleware/channels";

const channels = Router();

channels.post("/create", ChannelValidator, Create);

export default channels;
