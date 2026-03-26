import type { Request, Response, NextFunction } from "express";
import { userService } from "./user.service.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import type { CreateUserInput, UpdateUserInput, LoginInput, PaginationQuery } from "./user.types.js";

export const userController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { users, meta } = await userService.getAll(req.query as PaginationQuery);
      return ApiResponse.paginated(res, users, meta);
    } catch (err) {
      return next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getById(req.params["id"] as string);
      return ApiResponse.success(res, user);
    } catch (err) {
      return next(err);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.create(req.body as CreateUserInput);
      return ApiResponse.created(res, user, "User registered successfully");
    } catch (err) {
      return next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.update(
        req.params["id"] as string,
        req.body as UpdateUserInput
      );
      return ApiResponse.success(res, user, "User updated successfully");
    } catch (err) {
      return next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.delete(req.params["id"] as string);
      return ApiResponse.noContent(res);
    } catch (err) {
      return next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const tokens = await userService.login(req.body as LoginInput);
      return ApiResponse.success(res, tokens, "Login successful");
    } catch (err) {
      return next(err);
    }
  },

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.getById(req.user!.userId);
      return ApiResponse.success(res, user);
    } catch (err) {
      return next(err);
    }
  },
};
