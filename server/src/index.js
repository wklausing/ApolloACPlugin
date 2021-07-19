const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const {database} = require("./db");

const server = new ApolloServer({
  // debug: false,
  typeDefs,
	resolvers,
	plugins: [
		require('./ACPlugin/plugin'),
  ],
})

server.listen(4000, () => {
    console.log("GraphQL server running at http://localhost:4000.");
})
