import { Router } from "express";

import { login } from "../controllers/auth.js";

export const authRouters = new Router();

authRouters.post("/login", login);
