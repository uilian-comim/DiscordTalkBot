import { Router } from "express";
import { Create, Delete, Favorite } from "src/api/controllers/users";
import { UserValidator, UserVerify } from "src/api/middleware";

const users = Router();

users.post("/create", UserValidator, Create);
users.delete("/delete", UserVerify, Delete);
users.put("/favorite", UserVerify, Favorite);

export default users;
