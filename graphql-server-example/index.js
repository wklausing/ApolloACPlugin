const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema.js');
const { resolvers, createStore } = require('./resolvers.js');

// Setup server.
const server = new ApolloServer({ typeDefs, resolvers });

// Start server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
