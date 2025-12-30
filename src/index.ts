import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { Movies } from "./movies/models.ts";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.

  type Award {
     wins: Int
     nominations: Int
     text: String
  }
     
  type Movie {
    _id: ID
    title: String
    author: String
    awards: [Award]
    isNew: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    movie(_id: ID,): Movie
    movies(title:String,page: Int!): [Movie]
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    movies: async (
      _root: any,
      { title, page }: { title: string; page: number }
    ) => {
      const perPage = 20;
      const skip = (page - 1) * perPage;

      if (title) {
        return Movies.find({ title }).skip(skip).limit(perPage);
      }

      return Movies.find().skip(skip).limit(perPage);
    },
    movie: async (_root: any, { _id }: { _id: string }) => {
      const movies = await Movies.findOne({ _id });

      return movies;
    }
  },
  Movie: {
    isNew: (root: any) => {
      if (root.year > 2000) {
        return true;
      } else {
        return false;
      }
    }
  }
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

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

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
});

console.log(`🚀  Server ready at: ${url}`);
