import { prisma } from "../../lib/prisma.js";
import type { CreateUserInput, UpdateUserInput } from "./user.types.js";

// Raw DB access only — no business logic here
export const userRepository = {
  findAll(skip: number, take: number) {
    return prisma.user.findMany({
      skip,
      take,
      omit: { password: true },
      orderBy: { createdAt: "desc" },
    });
  },

  count() {
    return prisma.user.count();
  },

  findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  },

  findByEmail(email: string) {
    // Returns full user including password — for auth only
    return prisma.user.findUnique({ where: { email } });
  },

  create(data: CreateUserInput) {
    return prisma.user.create({
      data,
      omit: { password: true },
    });
  },

  update(id: string, data: UpdateUserInput) {
    return prisma.user.update({
      where: { id },
      data,
      omit: { password: true },
    });
  },

  delete(id: string) {
    return prisma.user.delete({ where: { id } });
  },

  exists(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
  },
};
