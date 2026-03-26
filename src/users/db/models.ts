import { Schema, model } from "mongoose";
import { type IUserDocument } from "../types/user.ts";

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
  },
  { timestamps: true },
);

export const Users = model<IUserDocument>("Users", UserSchema);
