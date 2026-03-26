import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { ApiError } from "../utils/ApiError.js";

type ValidateTarget = "body" | "params" | "query";

export function validate(schema: ZodSchema, target: ValidateTarget = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      const errors = result.error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));
      return next(
        new ApiError(422, "Validation failed", true)
      );
      // Return detailed validation errors
      void errors;
    }
    // Replace with parsed/coerced data
    req[target] = result.data;
    return next();
  };
}

// Overload that returns detailed errors
export function validateWithDetails(schema: ZodSchema, target: ValidateTarget = "body") {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      return _res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: result.error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }
    req[target] = result.data;
    return next();
  };
}
