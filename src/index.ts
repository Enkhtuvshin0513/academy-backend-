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

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`🚀  Server ready at: ${url}`);
