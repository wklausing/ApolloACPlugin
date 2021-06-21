const { gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # SQLite table users
  type users {
    id: Int
    createdAt: String
    updatedAt: String
    email: String
    profileImage: String
    token: String
  }

  # Example data Book
  type Book {
    title: String
    author: String
  }

  # Example data Author
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
    table_users: [users]
  }
`;

module.exports = typeDefs;
