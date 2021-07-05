const sqlite3 = require('sqlite3').verbose();

//create a database if no exists
const database = new sqlite3.Database("./fitbit.db");

//create a table to insert post
const createDailyActivitiesTable = () => {
    const  query  =  `
        CREATE TABLE IF NOT EXISTS DailyActivities (
        id integer,
        activityDate date,
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
        PRIMARY KEY (id, activityDate)
       )`;

    return  database.run(query);
}

//call function to init the post table
createDailyActivitiesTable();

//create a table to insert post
const createHeartratePerSecondsTable = () => {
    const  query  =  `
        CREATE TABLE IF NOT EXISTS HeartratePerSeconds (
        Id integer,
        Time date,
        Value integer,
        PRIMARY KEY (Id, Time)
       )`;

    return  database.run(query);
}

//call function to init the post table
createHeartratePerSecondsTable();

//export schema to use on index.js
module.exports = {
    database
}
