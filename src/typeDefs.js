import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    hello: String!
    posts: [Post!]!
  }

  type Mutation {
    createPost(data: createPostInput!): Post!
    updatePost(id: ID!, data: updatePostInput!): Post!
  }

  type Post {
    _id: ID!
    title: String!
    body: String!
  }

  input createPostInput {
    title: String!
    body: String!
  }
  input updatePostInput {
    title: String
    body: String
  }
`

export { typeDefs as default }
