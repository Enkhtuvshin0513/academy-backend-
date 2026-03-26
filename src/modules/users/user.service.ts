import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "./user.repository.js";
import type {
  CreateUserInput,
  UpdateUserInput,
  LoginInput,
  PaginationQuery,
  AuthTokens,
} from "./user.types.js";
import { ApiError } from "../../utils/ApiError.js";
import { env } from "../../config/env.js";

const SALT_ROUNDS = 12;

export const userService = {
  async getAll(query: PaginationQuery) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      userRepository.findAll(skip, limit),
      userRepository.count(),
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
  },

  async getById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw ApiError.notFound("User");
    return user;
  },

  async create(input: CreateUserInput) {
    const existing = await userRepository.exists(input.email);
    if (existing) throw ApiError.conflict("Email already in use");

    const hashedPassword = await bcrypt.hash(input.password, SALT_ROUNDS);
    return userRepository.create({ ...input, password: hashedPassword });
  },

  async update(id: string, input: UpdateUserInput) {
    const user = await userRepository.findById(id);
    if (!user) throw ApiError.notFound("User");

    if (input.email && input.email !== user.email) {
      const existing = await userRepository.exists(input.email);
      if (existing) throw ApiError.conflict("Email already in use");
    }

    return userRepository.update(id, input);
  },

  async delete(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw ApiError.notFound("User");
    await userRepository.delete(id);
  },

  async login(input: LoginInput): Promise<AuthTokens> {
    const user = await userRepository.findByEmail(input.email);
    if (!user) throw ApiError.unauthorized("Invalid email or password");

    const isMatch = await bcrypt.compare(input.password, user.password);
    if (!isMatch) throw ApiError.unauthorized("Invalid email or password");

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] }
    );

    const { password: _, ...safeUser } = user;
    return { accessToken, user: safeUser };
  },
};
