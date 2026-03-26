import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import userRoutes from "./modules/users/user.routes.js";

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(cors({ origin: process.env["CORS_ORIGIN"] ?? "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/v1", userRoutes);

// ─── Error Handling (must be last) ───────────────────────────────────────────
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
