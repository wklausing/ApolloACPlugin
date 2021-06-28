const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const server = new ApolloServer({ schema: typeDefs.schema, graphiql: true})

server.listen(4000, () => {
    console.log("GraphQL server running at http://localhost:4000.");
})
