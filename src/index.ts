import app from "./app.js";
import { prisma } from "./lib/prisma.js";

const PORT = process.env["PORT"] || 3000;

async function main() {
  // Connect to database
  await prisma.$connect();
  console.log("✅ Database connected");

  // Start server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});
