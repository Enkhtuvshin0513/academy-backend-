import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { typeDefs, resolvers } from "./apolloServer.ts";
import jwt from "jsonwebtoken";
import "dotenv/config";

mongoose
  .connect(
    "mongodb+srv://suuganbayr948_db_user:N8BpLF3xuTy1jdke@test-academy.zoomdjw.mongodb.net/sample_mflix/movies",
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err: Error) => {
    console.error("MongoDB connection error:", err);
  });

export interface IContext {
  user: {
    _id: string;
    name: string;
    email: string;
  } | null;
}

const server = new ApolloServer<IContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 2000 },
  context: async ({ req }) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return { user: null };
    }

    try {
      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret",
      ) as IContext["user"];

      return { user: decoded };
    } catch {
      return { user: null };
    }
  },
});

console.log(`🚀  Server ready at: ${url}`);
