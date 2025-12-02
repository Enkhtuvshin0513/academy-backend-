import { Router } from "express";
import { createUser, updateUser } from "../controllers/user.js";
import { getUsers } from "../controllers/user.js";

export const userRouters = new Router();

userRouters.post("/create", createUser);
userRouters.post("/update", updateUser);

userRouters.get("/get-users", getUsers);
