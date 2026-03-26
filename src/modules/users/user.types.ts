import type { User, Role } from "@prisma/client";

// Public user (no password)
export type SafeUser = Omit<User, "password">;

export type CreateUserInput = {
  email: string;
  name: string;
  password: string;
  role?: Role;
};

export type UpdateUserInput = {
  name?: string;
  email?: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type PaginationQuery = {
  page?: number;
  limit?: number;
};

export type AuthTokens = {
  accessToken: string;
  user: SafeUser;
};
