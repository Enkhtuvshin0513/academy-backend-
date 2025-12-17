import { Router } from "express";
import {
  createUser,
  updateUser,
  getUsers,
  deleteUser,
  getUserAccounts,
} from "../controllers/user.js";
import { verifyJWT } from "../jwtMiddleware.js";

export const userRouters = new Router();

export const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    if (!allowedRoles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });
    next();
  };
};

//user tei holbootoi post route uud

userRouters.get("/get-users", verifyJWT, getUsers);

userRouters.post("/create", createUser);
userRouters.post("/update", updateUser);
userRouters.post("/delete", deleteUser);

//user tei holbootoi get route uud

// userRouters.get("/get-users", getUsers);
userRouters.get("/get-user-accounts", getUserAccounts);
