var mysql      = require('mysql2');

var database = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mysql'
});

database.connect();

const createDailyActivitiesTable = () => {
    const  query  =  `
        CREATE TABLE IF NOT EXISTS DailyActivities (
          Id bigint,
          ActivityDate varchar(10),
          TotalSteps integer,
          TotalDistance float(7),
          TrackerDistance float(7),
          LoggedActivitiesDistance float(7),
          VeryActiveDistance float(7),
          ModeratelyActiveDistance float(7),
          LightActiveDistance float(7),
          SedentaryActiveDistance integer,
          VeryActiveMinutes integer,
          FairlyActiveMinutes integer,
          LightlyActiveMinutes integer,
          SedentaryMinutes integer,
          Calories integer,
          PRIMARY KEY (Id, ActivityDate)
       )`;
   database.query(query, function (error) {
     if (error) throw error;
   });
}
createDailyActivitiesTable();

const createHeartratePerSecondsTable = () => {
    const  query  =  `
        CREATE TABLE IF NOT EXISTS HeartratePerSeconds (
          Id bigint,
          Time varchar(22),
          Value integer,
          PRIMARY KEY (Id, Time)
       )`;
   database.query(query, function (error) {
     if (error) throw error;
   });
}
createHeartratePerSecondsTable();

const createPersonsTable = () => {
    const  query  =  `
        CREATE TABLE IF NOT EXISTS Persons (
          Id bigint,
          First_name text,
          Last_name text,
          Company_name text,
          Address text,
          City text,
          County text,
          State text,
          Zip text,
          Phone1 text,
          Phone2 text,
          Email text,
          Web text,
          PRIMARY KEY (Id)
       )`;
   database.query(query, function (error) {
     if (error) throw error;
   });
}
createPersonsTable();

module.exports = {
    database
}

// const sqlite3 = require('sqlite3').verbose();

// //create a database if no exists
// const database = new sqlite3.Database("./fitbit.db");

// const createDailyActivitiesTable = () => {
//     const  query  =  `
//         CREATE TABLE IF NOT EXISTS DailyActivities (
//         Id integer,
//         ActivityDate date,
//         TotalSteps integer,
//         TotalDistance float(7),
//         TrackerDistance float(7),
//         LoggedActivitiesDistance float(7),
//         VeryActiveDistance float(7),
//         ModeratelyActiveDistance float(7),
//         LightActiveDistance float(7),
//         SedentaryActiveDistance integer,
//         VeryActiveMinutes integer,
//         FairlyActiveMinutes integer,
//         LightlyActiveMinutes integer,
//         SedentaryMinutes integer,
//         Calories integer,
//         PRIMARY KEY (Id, ActivityDate)
//        )`;
//     return  database.run(query);
// }
// createDailyActivitiesTable();

// const createHeartratePerSecondsTable = () => {
//     const  query  =  `
//         CREATE TABLE IF NOT EXISTS HeartratePerSeconds (
//         Id integer,
//         Time date,
//         Value integer,
//         PRIMARY KEY (Id, Time)
//        )`;
//     return  database.run(query);
// }
// createHeartratePerSecondsTable();

// const createPersonsTable = () => {
//     const  query  =  `
//         CREATE TABLE IF NOT EXISTS Persons (
//         Id integer,
//         First_name text,
//         Last_name text,
//         Company_name text,
//         Address text,
//         City text,
//         County text,
//         State text,
//         Zip text,
//         Phone1 text,
//         Phone2 text,
//         Email text,
//         Web text,
//         PRIMARY KEY (Id)
//        )`;
//     return  database.run(query);
// }
// createPersonsTable();

// //export schema to use on index.js
// module.exports = {
//     database
// }