const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./schema.js');
const { resolvers, createStore } = require('./resolvers.js');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Author {
    firstName: String
    lastName: String
    age: Int
    books: [Book]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const authors = [
  {
    firstName: 'William',
    lastName: 'Shakespear',
    age: 150,
  },
  {
    firstName: 'Frank',
    lastName: 'Pallas',
    age: 40,
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
	typeDefs, 
	resolvers,
	plugins: [
		require('./ACPlugin/plugin'),
  ],
});
=======
// Setup server.
const server = new ApolloServer({ typeDefs, resolvers });


// Start server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
