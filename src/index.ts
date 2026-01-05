import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { typeDefs, resolvers } from "./apolloServer.ts";

mongoose
  .connect(
    "mongodb+srv://enkhtuvshinej_db_user:7aLod5Z9aBfk23pu@backend-lesson.pfxqeun.mongodb.net/sample_mflix?appName=backend-lesson"
  )
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err: Error) => {
    console.error("MongoDB connection error:", err);
  });

export interface IContext {
  user: {
    firstname: string;
  };
}

const server = new ApolloServer<IContext>({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    return {
      user: {
        firstname: "bat"
      }
    };
  }
});

console.log(`🚀  Server ready at: ${url}`);
