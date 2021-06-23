const sqlite3 = require('sqlite3').verbose();

// open database in memory
let db = new sqlite3.Database('FitBitDB.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to SQlite database.');
});

// Create tables, no read in of data.
// dailyActivity_merged.csv
db.run('CREATE TABLE IF NOT EXISTS dailyActivity (' +
  ' Id TEXT,' +
  ' ActivityDate TEXT DEFAULT NULL,' +
  ' TotalSteps INTEGER DEFAULT 0,' +
  ' TotalDistance  INTEGER DEFAULT 0,' +
  ' TrackerDistance INTEGER DEFAULT 0,' +
  ' LoggedActivitiesDistance  INTEGER DEFAULT 0,' +
  ' VeryActiveDistance  INTEGER DEFAULT 0,' +
  ' ModeratelyActiveDistance  INTEGER DEFAULT 0,' +
  ' LightActiveDistance  INTEGER DEFAULT 0,' +
  ' SedentaryActiveDistance  INTEGER DEFAULT 0,' +
  ' VeryActiveMinutes  INTEGER DEFAULT 0,' +
  ' FairlyActiveMinutes  INTEGER DEFAULT 0,' +
  ' LightlyActiveMinutes  INTEGER DEFAULT 0,' +
  ' SedentaryMinutes  INTEGER DEFAULT 0,' +
  ' Calories INTEGER DEFAULT 0,' +
  ' PRIMARY KEY(Id, ActivityDate));');
//db.run('.import ./FitbitDB/dailyActivity_merged.csv dailyActivity --csv');
console.log('Created dailyActivity.');

// dailyCalories_merged.csv
db.run('CREATE TABLE IF NOT EXISTS dailyCalories (' +
  ' Id TEXT,' +
  ' ActivityDay TEXT DEFAULT NULL,' +
  ' Calories INTEGER,' +
  ' PRIMARY KEY(Id, ActivityDay));');
//db.run('.import ./FitbitDB/dailyCalories_merged.csv dailyCalories --csv');
console.log('Created dailyCalories.');

// dailyIntensities_merged.csv

// dailySteps_merged.csv

// heartrate_seconds_merged.csv

// hourlyCalories_merged.csv

// hourlyIntensities_merged.csv

// hourlySteps_merged.csv

// minuteCaloriesNarrow_merged.csv

// minuteCaloriesWide_merged.csv

// minuteIntensitiesNarrow_merged.csv

// minuteIntensitiesWide_merged.csv

// minuteMETsNarrow_merged.csv

// minuteSleep_merged.csv

// minuteStepsNarrow_merged.csv

// minuteStepsWide_merged.csv

// sleepDay_merged.csv

// weightLogInfo_merged.csv


// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
