import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Health check ─────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ─── Routes ───────────────────────────────────────────────────────────────
app.use("/api", userRoutes);

export default app;
