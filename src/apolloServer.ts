import {
  movieTypesDefs,
  movieQueryTypeDefs,
  movieMutationTypeDefs,
} from "./movies/graphql/schema.ts";
import { movieQueries } from "./movies/graphql/queries.ts";
import { movieMutations } from "./movies/graphql/mutations.ts";
import {
  userQueryTypeDefs,
  userMutationTypeDefs,
  userTypeDefs,
} from "./users/graphql/shema.ts";
import { userMutations } from "./users/graphql/mutations.ts";
import { userQueries } from "./users/graphql/queries.ts";

export const typeDefs = `
  ${movieTypesDefs}
  ${userTypeDefs}

  type Query {
    ${movieQueryTypeDefs}
    ${userQueryTypeDefs}
  }

  type Mutation {
    ${movieMutationTypeDefs}
    ${userMutationTypeDefs}
  }
`;

export const resolvers = {
  Query: { ...movieQueries, ...userQueries },
  Mutation: {
    ...movieMutations,
    ...userMutations,
  },
};
