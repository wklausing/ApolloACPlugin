const {database} = require("./db");

const resolvers = {
  Query: {
    async DailyActivities (_, __, ___) {
      return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.all("SELECT * FROM DailyActivities;", function(err, rows) {
              if(err){
                  reject([]);
              }
              resolve(rows);
          });
      });
    },
  },
};

module.exports = resolvers;
