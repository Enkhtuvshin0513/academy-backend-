export const userTypeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;

export const userQueryTypeDefs = `
  users: [User]!
`;

export const userMutationTypeDefs = `
  addUser(input: RegisterInput!): User!
  login(input: LoginInput!): User!
`;
