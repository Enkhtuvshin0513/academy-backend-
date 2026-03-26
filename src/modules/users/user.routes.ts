import { Router } from "express";
import { userController } from "./user.controller.js";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import { validateWithDetails } from "../../middleware/validate.middleware.js";
import {
  createUserSchema,
  updateUserSchema,
  loginSchema,
  paginationSchema,
  idParamSchema,
} from "./user.schema.js";

const router = Router();

// Auth routes (public)
router.post("/auth/register", validateWithDetails(createUserSchema), userController.create);
router.post("/auth/login",    validateWithDetails(loginSchema),      userController.login);

// Protected routes
router.get("/users/me", authenticate, userController.me);

// CRUD (admin only for list/delete, authenticated for self-update)
router.get(
  "/users",
  authenticate,
  authorize("ADMIN"),
  validateWithDetails(paginationSchema, "query"),
  userController.getAll
);

router.get(
  "/users/:id",
  authenticate,
  validateWithDetails(idParamSchema, "params"),
  userController.getById
);

router.patch(
  "/users/:id",
  authenticate,
  validateWithDetails(idParamSchema, "params"),
  validateWithDetails(updateUserSchema),
  userController.update
);

router.delete(
  "/users/:id",
  authenticate,
  authorize("ADMIN"),
  validateWithDetails(idParamSchema, "params"),
  userController.delete
);

export default router;
