import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Rating {
    rating: Float
    numReviews: Int
    meter: Int
  }

  type Tomatoes {
    viewer: Rating
    critic: Rating
    rotten: Int
    lastUpdated: String
    fresh: Int
  }

  type Awards {
    wins: Int
    nominations: Int
    text: String
  }

  type Movie {
    id: ID!
    title: String!
    year: Int!
    plot: String!
    fullpolt: String!
    genre: [String!]!
    runtime: Int!
    cast: [String!]!
    poster: String!
    relased: String!
    languages: [String!]!
    directors: [String!]!
    awards: Awards
    tomatoes: Tomatoes
  }

  type Query {
    movies: [Movie!]!
    movie(id: ID!): Movie
  }
`;
