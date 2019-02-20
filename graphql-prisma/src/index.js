import { GraphQLServer, PubSub } from 'graphql-yoga'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import User from './resolvers/User'
import prisma from './prisma'

const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/generated/prisma.graphql',
    resolvers: {
        Query,
        Mutation,
        User
    },
    resolverValidationOptions :{
        requireResolversForResolveType: false
      },
    context(request)
    
    {
        return {
        pubsub,
        prisma,
        request
    }
}
})

server.start(() => {
    console.log('The server is up!')
})