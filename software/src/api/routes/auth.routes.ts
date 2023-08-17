import { Router } from "express";
import { refresh, signin, signout } from "src/api/controllers/auth";
import { TokenValidator } from "src/api/middleware";

const auth = Router();

auth.post("/signin", signin);
auth.get("/refresh", TokenValidator, refresh);
auth.get("/signout", TokenValidator, signout);

export default auth;
