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
              console.log(rows)
          });
      });
    },
    async DailyActivity (_, {id}, ___) {
      return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.all("SELECT * FROM DailyActivities WHERE id = (?);", [id], function(err, rows) {
              if(err){
                  reject([]);
              }
              resolve(rows);
              console.log(rows)
          });
      });
    },
  },
  Mutation: {
    async AddDailyActivity (_, {id,activityDate,TotalSteps}, ___) {
      return new Promise((resolve, reject) => {
          //raw SQLite to insert a new post in post table
          database.run('INSERT INTO DailyActivities (Id,ActivityDate,TotalSteps) VALUES (?,?,?);',[id,activityDate,TotalSteps], (err) => {
              if(err) {
                  reject(null);
                  console.log("AddDailyActivity: Insert failed")
              }
              database.all("SELECT * FROM DailyActivities WHERE Id = (?);", [id], function(err, rows) {
                  if(err){
                      reject([]);
                      console.log("AddDailyActivity: Select failed")
                  }
                  resolve(rows);
                  console.log(rows)
              });
          });
      })
    }
  }
};

module.exports = resolvers;
