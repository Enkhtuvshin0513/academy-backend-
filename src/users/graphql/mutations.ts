import { Users } from "../db/models.ts";
import { type IUser } from "../types/user.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userMutations = {
  addUser: async (_root: any, { input }: { input: IUser }) => {
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const newUser = await Users.create({
      name: input.name,
      email: input.email,
      password: hashedPassword,
    });

    return {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };
  },
  login: async (_root: any, { input }: { input: IUser }) => {
    const user = await Users.findOne({ email: input.email }).select(
      "+password",
    );
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(input.password, user.password);
    if (!isMatch) throw new Error("Invalid password");

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  },
};
