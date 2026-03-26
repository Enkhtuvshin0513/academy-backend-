import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError.js";
import { env } from "../config/env.js";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  // Prisma known request errors
  if (err.constructor.name === "PrismaClientKnownRequestError") {
    const prismaError = err as { code?: string; meta?: { target?: string[] } };
    if (prismaError.code === "P2002") {
      const field = prismaError.meta?.target?.[0] ?? "field";
      return res.status(409).json({
        success: false,
        message: `A record with this ${field} already exists`,
      });
    }
    if (prismaError.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Record not found",
      });
    }
  }

  // Unhandled errors
  console.error("Unhandled error:", err);
  return res.status(500).json({
    success: false,
    message: env.NODE_ENV === "production" ? "Internal server error" : err.message,
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
}
