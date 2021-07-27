const {database} = require("./db");

const resolvers = {
  Query: {
    async Persons (_, __, ___) {
      return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.query('SELECT * FROM Persons;', function(err, rows) {
              if(err){
                  reject([]);
              }
              resolve(rows);
              rows.shift();
          });
      });
    },
    async DailyActivities (_, __, ___) {
      return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.query('SELECT * FROM DailyActivities;', function(err, rows) {
              if(err){
                  reject([]);
              }
              resolve(rows);
              rows.shift();
          });
      });
    },
    async DailyActivity (_, {Id}, ___) {
      return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.query('SELECT * FROM DailyActivities WHERE Id = (?);', [Id], function(err, rows) {
              if(err){
                  reject([]);
              }
              resolve(rows);
          });
      });
    },
    async HeartratePerSeconds (_, {Id, Time}, {___}) {
      return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.query('SELECT * FROM HeartratePerSeconds WHERE Id = (?) AND Time Like (?);', [Id, Time+'%'], function(err, rows) {
              if(err){
                  reject([]);
              }
              resolve(rows);
              rows.shift();
          });
      });
    },
    async SleepDays (_, __, ___) {
      return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.query('SELECT * FROM SleepDays;', function(err, rows) {
              if(err){
                  reject([]);
              }
              resolve(rows);
              rows.shift();
          });
      });
    },
    async WeightPounds (_, __, ___) {
      return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.query('SELECT * FROM WeightPounds;', function(err, rows) {
              if(err){
                  reject([]);
              }
              resolve(rows);
              rows.shift();
          });
      });
    },
    async HourlyIntensities (_, __, ___) {
      return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.query('SELECT * FROM HourlyIntensities;', function(err, rows) {
              if(err){
                  reject([]);
              }
              resolve(rows);
              rows.shift();
          });
      });
    },
    async DailySteps (_, __, ___) {
      return new Promise((resolve, reject) => {
          // raw SQLite query to select from table
          database.query('SELECT * FROM DailySteps;', function(err, rows) {
              if(err){
                  reject([]);
              }
              resolve(rows);
              rows.shift();
          });
      });
    },
    async DailyIntensities (_, __, ___) {
      return new Promise((resolve, reject) => {
          console.log("hi");
          // raw SQLite query to select from table
          database.query('SELECT * FROM DailyIntensities;', function(err, rows) {
              if(err){
                  reject([]);
              }
              resolve(rows);
              rows.shift();
          });
      });
    },
  },
  Mutation: {
    async InsertDailyActivity (_, {Id,ActivityDate,TotalSteps}, ___) {
      return new Promise((resolve, reject) => {
          //raw SQLite to insert a new post in post table
          database.query('INSERT INTO DailyActivities (Id,ActivityDate,TotalSteps) VALUES (?,STR_TO_DATE(?, "%d/%m/%Y"),?);',[Id,ActivityDate,TotalSteps], (err) => {
              if(err) {
                  reject(null);
                  console.log('InsertDailyActivity: Insert failed')
              }
              database.query('SELECT * FROM DailyActivities WHERE Id = (?);', [Id], function(err, rows) {
                  if(err){
                      reject([]);
                      console.log('InsertDailyActivity: Select failed')
                  }
                  resolve(rows);
              });
          });
      })
    },
    async DeleteDailyActivity (_, {Id,ActivityDate}, ___) {
      return new Promise((resolve, reject) => {
          //raw SQLite to insert a new post in post table
          database.query('DELETE FROM DailyActivities WHERE Id=(?) AND ActivityDate=STR_TO_DATE(?, "%d/%m/%Y");',[Id,ActivityDate], (err) => {
              if(err) {
                  reject(null);
                  console.log('DeleteDailyActivity: Delete failed')
              }
              database.query('SELECT * FROM DailyActivities WHERE Id = (?) AND ActivityDate=STR_TO_DATE(?, "%d/%m/%Y");', [Id,ActivityDate], function(err, rows) {
                  if(err){
                      reject([]);
                      console.log('DeleteDailyActivity: Select failed')
                  }
                  resolve(rows);
              });
          });
      })
    }
  }
};

module.exports = resolvers;

// const {database} = require("./db");

// const resolvers = {
//   Query: {
//     async DailyActivities (_, __, ___) {
//       return new Promise((resolve, reject) => {
//           // raw SQLite query to select from table
//           database.all("SELECT * FROM DailyActivities;", function(err, rows) {
//               if(err){
//                   reject([]);
//               }
//               resolve(rows);
//               rows.shift();
//               //console.log(rows)
//           });
//       });
//     },
//     async DailyActivity (_, {Id}, ___) {
//       return new Promise((resolve, reject) => {
//           // raw SQLite query to select from table
//           database.all("SELECT * FROM DailyActivities WHERE Id = (?);", [Id], function(err, rows) {
//               if(err){
//                   reject([]);
//               }
//               resolve(rows);
//               //console.log(rows)
//           });
//       });
//     },
//     async HeartratePerSeconds (_, {Id}, ___) {
//       return new Promise((resolve, reject) => {
//           // raw SQLite query to select from table
//           database.all("SELECT * FROM HeartratePerSeconds WHERE Id = (?);", [Id], function(err, rows) {
//               if(err){
//                   reject([]);
//               }
//               resolve(rows);
//               rows.shift();
//               //console.log(rows)
//           });
//       });
//     },
//   },
//   Mutation: {
//     async InsertDailyActivity (_, {Id,ActivityDate,TotalSteps}, ___) {
//       return new Promise((resolve, reject) => {
//           //raw SQLite to insert a new post in post table
//           database.run('INSERT INTO DailyActivities (Id,ActivityDate,TotalSteps) VALUES (?,?,?);',[Id,ActivityDate,TotalSteps], (err) => {
//               if(err) {
//                   reject(null);
//                   console.log("InsertDailyActivity: Insert failed")
//               }
//               database.all("SELECT * FROM DailyActivities WHERE Id = (?);", [Id], function(err, rows) {
//                   if(err){
//                       reject([]);
//                       console.log("InsertDailyActivity: Select failed")
//                   }
//                   resolve(rows);
//                   //console.log(rows)
//               });
//           });
//       })
//     },
//     async DeleteDailyActivity (_, {Id,ActivityDate}, ___) {
//       return new Promise((resolve, reject) => {
//           //raw SQLite to insert a new post in post table
//           database.run('DELETE FROM DailyActivities WHERE Id=(?) AND ActivityDate=(?);',[Id,ActivityDate], (err) => {
//               if(err) {
//                   reject(null);
//                   console.log("DeleteDailyActivity: Delete failed")
//               }
//               database.all("SELECT * FROM DailyActivities WHERE Id = (?) AND ActivityDate=(?);", [Id,ActivityDate], function(err, rows) {
//                   if(err){
//                       reject([]);
//                       console.log("DeleteDailyActivity: Select failed")
//                   }
//                   resolve(rows);
//                   //console.log(rows)
//               });
//           });
//       })
//     }
//   }
// };

// module.exports = resolvers;
