import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Add `user` property to every Express request
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; email: string; role: string };
    }
  }
}

// Check if the user is logged in (has a valid token)
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1]!;

  try {
    const payload = jwt.verify(token, process.env["JWT_SECRET"]!) as {
      userId: string;
      email: string;
      role: string;
    };
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

// Check if the user has the required role (e.g. "ADMIN")
export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Not authenticated" });
      return;
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: "Access denied" });
      return;
    }
    next();
  };
}
