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
          Id integer,
          ActivityDate date,
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
          Id integer,
          Time date,
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
          Id integer,
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
