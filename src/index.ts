import "./config/env.js"; // Validate env first
import { env } from "./config/env.js";
import app from "./app.js";
import { prisma } from "./lib/prisma.js";

async function bootstrap() {
  // Verify DB connection
  await prisma.$connect();
  console.log("Database connected");

  const server = app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT} [${env.NODE_ENV}]`);
  });

  // Graceful shutdown
  const shutdown = async (signal: string) => {
    console.log(`\n${signal} received — shutting down gracefully`);
    server.close(async () => {
      await prisma.$disconnect();
      console.log("Database disconnected. Server closed.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT",  () => shutdown("SIGINT"));
}

bootstrap().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
