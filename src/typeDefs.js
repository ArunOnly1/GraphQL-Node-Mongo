import { gql } from 'apollo-server-core'

const typeDefs = gql`
  type Query {
    hello: String!
    welcome: String!
  }

  type Mutation {
    signUp(data: SignUpInput!): User!
    login(data: LoginInput!): Token!
    createPost(data: CreatePostInput!): String!
  }

  type Token {
    accesstoken: String!
    refreshtoken: String!
  }

  type Post {
    _id: ID!
    title: String!
    body: String!
  }

  input CreatePostInput {
    title: String!
    body: String!
  }
  input LoginInput {
    email: String!
    password: String!
  }

  input SignUpInput {
    email: String!
    password: String!
    username: String!
    role: Role!
    avatar: String
  }

  enum Role {
    ADMIN
    USER
  }

  type User {
    _id: ID!
    email: String!
    password: String!
    username: String!
    role: Role!
    avatar: String
    createdAt: String!
    updatedAt: String!
  }
`
export { typeDefs as default }
