const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const {database} = require("./db");

const server = new ApolloServer({
  typeDefs,
	resolvers
})

server.listen(4000, () => {
    console.log("GraphQL server running at http://localhost:4000.");
})
