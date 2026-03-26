import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

// Fields we always return — never expose the password
const safeSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  createdAt: true,
};

// ─── Get all users with pagination ────────────────────────────────────────
export async function getAllUsers(page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: limit,
      select: safeSelect,
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count(),
  ]);

  return {
    users,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// ─── Get one user by ID ────────────────────────────────────────────────────
export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: safeSelect,
  });

  if (!user) throw new Error("User not found");

  return user;
}

// ─── Register a new user ───────────────────────────────────────────────────
export async function registerUser(name: string, email: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
    select: safeSelect,
  });

  return user;
}

// ─── Login ─────────────────────────────────────────────────────────────────
export async function loginUser(email: string, password: string) {
  // Need password here to compare, so no safeSelect
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env["JWT_SECRET"]!,
    { expiresIn: "7d" }
  );

  const { password: _pw, ...safeUser } = user;
  return { token, user: safeUser };
}

// ─── Delete a user ─────────────────────────────────────────────────────────
export async function deleteUser(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");

  await prisma.user.delete({ where: { id } });
}
