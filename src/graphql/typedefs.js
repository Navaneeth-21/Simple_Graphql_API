import { gql } from "graphql-tag";

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    description: String!
    age: Int
    CreatedAt: String
  }

  input userInput {
    name: String!
    description: String!
    age: Int!
  }
  
  input editUserInput {
    name: String
    description: String
    age: Int
  }

  type Query {
    user(id: ID!): User!
    getUser(amount: Int): [User]
  }

  type Mutation {
    createUser(userInput: userInput!): User!
    deleteUser(id: ID!): Boolean
    editUser(id: ID!, editUserInput: editUserInput): User
  }
`;

export default typeDefs;
