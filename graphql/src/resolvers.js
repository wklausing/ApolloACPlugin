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
    async DailyActivitiy (_, {Id}, ___) {
      return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.all("SELECT * FROM DailyActivities WHERE Id = (?);", [Id], function(err, rows) {
              if(err){
                  reject([]);
              }
              resolve(rows);
          });
      });
    },
  },
  Mutation: {
    async AddDailyActivity (_, {Id,ActivityDate,TotalSteps}, ___) {
      return new Promise((resolve, reject) => {
          //raw SQLite to insert a new post in post table
          database.run('INSERT INTO DailyActivities (Id,ActivityDate,TotalSteps) VALUES (?,?,?);',[Id,ActivityDate,TotalSteps], (err) => {
              if(err) {
                  reject(null);
              }
              database.all("SELECT * FROM DailyActivities WHERE Id = (?);", [Id], function(err, rows) {
                  if(err){
                      reject([]);
                  }
                  resolve(rows);
              });
          });
      })
    }
  }
};

module.exports = resolvers;
