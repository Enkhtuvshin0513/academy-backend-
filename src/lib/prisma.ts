import { PrismaClient } from "@prisma/client";

// Create one shared Prisma instance for the whole app
export const prisma = new PrismaClient();
