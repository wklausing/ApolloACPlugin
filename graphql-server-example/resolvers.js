const {Sequelize} = require('sequelize');

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },
};
module.exports = resolvers;

//Connect with SQLite
module.exports.createStore = () => {
  const db = new Sequelize({
    dialect: 'sqlite',
    storage: './store.sqlite'
  });

  const users = db.define('user', {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    email: Sequelize.STRING,
    profileImage: Sequelize.STRING,
    token: Sequelize.STRING,
  });

  //const trips = db.define('trip', {
    //createdAt: Sequelize.DATE,
    //updatedAt: Sequelize.DATE,
    //launchId: Sequelize.INTEGER,
    //userId: Sequelize.INTEGER,
  //});

  return { db, users};
};


//Test Data
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
