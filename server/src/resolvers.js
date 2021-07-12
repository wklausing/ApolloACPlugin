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
              //console.log(rows)
          });
      });
    },
    async DailyActivity (_, {Id}, ___) {
      return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.all("SELECT * FROM DailyActivities WHERE Id = (?);", [Id], function(err, rows) {
              if(err){
                  reject([]);
              }
              resolve(rows);
              //console.log(rows)
          });
      });
    },
    async HeartratePerSeconds (_, {Id}, ___) {
      return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.all("SELECT * FROM HeartratePerSeconds WHERE Id = (?);", [Id], function(err, rows) {
              if(err){
                  reject([]);
              }
              resolve(rows);
              rows.shift();
              //console.log(rows)
          });
      });
    },
  },
  Mutation: {
    async InsertDailyActivity (_, {Id,ActivityDate,TotalSteps}, ___) {
      return new Promise((resolve, reject) => {
          //raw SQLite to insert a new post in post table
          database.run('INSERT INTO DailyActivities (Id,ActivityDate,TotalSteps) VALUES (?,?,?);',[Id,ActivityDate,TotalSteps], (err) => {
              if(err) {
                  reject(null);
                  console.log("InsertDailyActivity: Insert failed")
              }
              database.all("SELECT * FROM DailyActivities WHERE Id = (?);", [Id], function(err, rows) {
                  if(err){
                      reject([]);
                      console.log("InsertDailyActivity: Select failed")
                  }
                  resolve(rows);
                  //console.log(rows)
              });
          });
      })
    },
    async DeleteDailyActivity (_, {Id,ActivityDate}, ___) {
      return new Promise((resolve, reject) => {
          //raw SQLite to insert a new post in post table
          database.run('DELETE FROM DailyActivities WHERE Id=(?) AND ActivityDate=(?);',[Id,ActivityDate], (err) => {
              if(err) {
                  reject(null);
                  console.log("DeleteDailyActivity: Delete failed")
              }
              database.all("SELECT * FROM DailyActivities WHERE Id = (?) AND ActivityDate=(?);", [Id,ActivityDate], function(err, rows) {
                  if(err){
                      reject([]);
                      console.log("DeleteDailyActivity: Select failed")
                  }
                  resolve(rows);
                  //console.log(rows)
              });
          });
      })
    }
  }
};

module.exports = resolvers;
