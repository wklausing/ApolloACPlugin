var mysql = require('mysql2');

var database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test'
});

database.connect();


const createFitBitDB = () => {
  var query = `
        CREATE DATABASE IF NOT EXISTS fitbit
       `;
  database.query(query, function(error) {
    if (error) throw error;
  });

  query = `
       USE fitbit
      `;
  database.query(query, function(error) {
    if (error) throw error;
  });

  query = `
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
  database.query(query, function(error) {
    if (error) throw error;
  });

  query = `
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
  database.query(query, function(error) {
    if (error) throw error;
  });

  query = `
    CREATE TABLE IF NOT EXISTS HeartratePerSeconds (
      Id bigint,
      Time varchar(22),
      Value integer,
      PRIMARY KEY (Id, Time)
   )`;
  database.query(query, function(error) {
    if (error) throw error;
  });

  query = `
    CREATE TABLE IF NOT EXISTS SleepDays (
      Id bigint,
      SleepDay varchar(22),
      TotalSleepRecords integer,
      TotalMinutesAsleep integer,
      TotalTimeInBed integer,
      PRIMARY KEY (Id, SleepDay)
   )`;
  database.query(query, function(error) {
    if (error) throw error;
  });

  query = `
    CREATE TABLE IF NOT EXISTS WeightPounds (
      Id bigint,
      Date varchar(22),
      WeightKg float(7),
      WeightPounds float(7),
      Fat float(7),
      BMI float(7),
      IsManualReport boolean,
      LogId bigint,
      PRIMARY KEY (Id, Date)
   )`;
  database.query(query, function(error) {
    if (error) throw error;
  });

  query = `
    CREATE TABLE IF NOT EXISTS HourlyIntensities (
      Id bigint,
      ActivityHour varchar(22),
      TotalIntensity integer,
      AverageIntensity float(7),
      PRIMARY KEY (Id, ActivityHour)
   )`;
  database.query(query, function(error) {
    if (error) throw error;
  });

  query = `
    CREATE TABLE IF NOT EXISTS DailySteps (
      Id bigint,
      ActivityDay varchar(10),
      StepTotal integer,
      PRIMARY KEY (Id, ActivityDay)
   )`;
  database.query(query, function(error) {
    if (error) throw error;
  });

  query = `
    CREATE TABLE IF NOT EXISTS DailyIntensities (
      Id bigint,
      ActivityDay varchar(10),
      SedentaryMinutes integer,
      LightlyActiveMinutes integer,
      FairlyActiveMinutes integer,
      VeryActiveMinutes integer,
      SedentaryActiveDistance integer,
      LightActiveDistance float(7),
      ModeratelyActiveDistance float(7),
      VeryActiveDistance float(7),
      PRIMARY KEY (Id, ActivityDay)
   )`;
  database.query(query, function(error) {
    if (error) throw error;
  });

}
createFitBitDB();

module.exports = {
  database
}
