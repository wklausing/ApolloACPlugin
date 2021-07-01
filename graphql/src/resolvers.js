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
              rows.shift();
          });
      });
    },
    async DailyActivitiy (_, {id}, ___) {
      return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.all("SELECT * FROM DailyActivities WHERE id = (?);", [id], function(err, rows) {
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
