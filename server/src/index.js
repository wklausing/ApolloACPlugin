const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const {database} = require("./db");
const fs = require('fs');
const ini = require('ini');

let config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));


const server = new ApolloServer({
  debug: config.debug == "on" ? true : false,
  typeDefs,
	resolvers,
	plugins: [
		config.access_control == "on" ? require('./ACPlugin/plugin')(config.logging == "on" ? true : false) : config.logging == "on" ? require('./LoggerPlugin/plugin') : {},
  ],
})

server.listen(4000, () => {
    console.log("GraphQL server running at http://localhost:4000.");
})
