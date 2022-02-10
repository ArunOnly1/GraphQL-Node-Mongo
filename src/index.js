import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'

import typeDefs from './typeDefs'
import resolvers from './resolvers/index'
import { db_connect } from './db/db_connect'
import models from './models/index'
import { getAuthUser } from './lib/utils'
async function startApolloServer(typeDefs, resolvers, models) {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      console.log(req.headers.authorization)
      const authUser = await getAuthUser(req, models.User)
      console.log(authUser)
      return { models, authUser }
    },

    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  db_connect()
  await server.start()
  server.applyMiddleware({ app })
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers, models)
