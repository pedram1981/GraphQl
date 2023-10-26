import { gql } from 'graphql-request';

const typeDefs = gql`

type Blog {
  id:Int!
  blogTopic: String!
  blogContent: String!
  blogDatePost: String!
  email: String!
}

type Mutation {
  insert(blogTopic: String!, blogContent: String!, blogDatePost: String!, email: String!): String!
  delete(id: Int!): String!
  update(id: Int!, blogTopic: String!, blogContent: String!, blogDatePost: String!, email: String!): String!
}

type Query {
    blogsByEmail(email: String!): [Blog!]!
  }


`;

export { typeDefs };
