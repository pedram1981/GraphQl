import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Mutation {
    signOut(email: String!, pass: String!): String!
  }

  type Query {
    signIn(email: String!, pass: String!): SignInResponse!
  }

  type SignInResponse {
    email: String!
    token: String!
  }
  
  type User {
    id: Int!
    email: String!
    pass: String!
  }
`;

export default typeDefs;
