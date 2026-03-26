import { Router } from "express";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import * as userController from "../controllers/user.controller.js";

const router = Router();

// ─── Public routes (no login needed) ──────────────────────────────────────
router.post("/auth/register", userController.register);
router.post("/auth/login",    userController.login);

// ─── Protected routes (must be logged in) ─────────────────────────────────
router.get("/users/me",  authenticate, userController.getMe);
router.get("/users/:id", authenticate, userController.getById);

// ─── Admin only routes ─────────────────────────────────────────────────────
router.get("/users",        authenticate, authorize("ADMIN"), userController.getAll);
router.delete("/users/:id", authenticate, authorize("ADMIN"), userController.deleteUser);

export default router;
