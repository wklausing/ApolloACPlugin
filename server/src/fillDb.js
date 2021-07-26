const mysql = require("mysql2");
const fs = require("fs");
const fastcsv = require("fast-csv");

// create a new connection to the database
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mysql'
});

//DailyActivities
let stream = fs.createReadStream("../dataset/fitbitData/dailyActivity_merged.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
  // remove the first line: header
  csvData.shift();

  // open the connection
  connection.connect(error => {
    if (error) {
      console.error(error);
    } else {
      for(var i = 0; i < csvData.length; i++) {
        connection.query('INSERT INTO DailyActivities (Id,ActivityDate,TotalSteps,TotalDistance,TrackerDistance,LoggedActivitiesDistance,VeryActiveDistance,ModeratelyActiveDistance,LightActiveDistance,SedentaryActiveDistance,VeryActiveMinutes,FairlyActiveMinutes,LightlyActiveMinutes,SedentaryMinutes,Calories) VALUES ?;',
        [csvData], (error, response) => {
          console.log(error || response);
        });
      }
    }
  });
});
stream.pipe(csvStream);
console.log("Added DailyActivities data.")

//HeartratePerSeconds
let stream2 = fs.createReadStream("../dataset/fitbitData/heartrate_seconds_merged.csv");
let csvData2 = [];
let csvStream2 = fastcsv
  .parse()
  .on("data", function(data) {
    csvData2.push(data);
  })
  .on("end", function() {
  // remove the first line: header
  csvData2.shift();

  // open the connection
  connection.connect(error => {
    if (error) {
      console.error(error);
    } else {
      for(var i = 0; i < csvData2.length; i++) {
        connection.query('INSERT INTO HeartratePerSeconds (Id,Time,Value) VALUES ?;',
        [csvData2], (error, response) => {
          console.log(error || response);
        });
      }
    }
  });
});
stream2.pipe(csvStream2);
console.log("Added HeartratePerSeconds data.")

//Persons
let stream3 = fs.createReadStream("../dataset/Persons.csv");
let csvData3 = [];
let csvStream3 = fastcsv
  .parse()
  .on("data", function(data) {
    csvData3.push(data);
  })
  .on("end", function() {
  // remove the first line: header
  csvData3.shift();

  // open the connection
  connection.connect(error => {
    if (error) {
      console.error(error);
    } else {
      for(var i = 0; i < csvData3.length; i++) {
        connection.query('INSERT INTO Persons (Id,First_name,Last_name,Company_name,Address,City,County,State,Zip,Phone1,Phone2,Email,Web) VALUES ?;',
        [csvData3], (error, response) => {
          console.log(error || response);
        });
      }
    }
  });
});
stream3.pipe(csvStream3);
console.log("Added Persons data. DONE")

//Daily Calories
let stream4 = fs.createReadStream("../dataset/dailyCalories_merged.csv");
let csvData4 = [];
let csvStream4 = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
  // remove the first line: header
  csvData4.shift();

  // open the connection
  connection.connect(error => {
    if (error) {
      console.error(error);
    } else {
      for(var i = 0; i < csvData4.length; i++) {
        connection.query('INSERT INTO DailyCalories (Id,ActivityDay,Calories) VALUES ?;',
        [csvData4], (error, response) => {
          console.log(error || response);
        });
      }
    }
  });
});
stream4.pipe(csvStream4);
console.log("Added Daily Calories data. DONE")

//dailyIntensities
let stream5 = fs.createReadStream("../dataset/dailyIntensities_merged.csv");
let csvData5 = [];
let csvStream5 = fastcsv
  .parse()
  .on("data", function(data) {
    csvData5.push(data);
  })
  .on("end", function() {
  // remove the first line: header
  csvData5.shift();

  // open the connection
  connection.connect(error => {
    if (error) {
      console.error(error);
    } else {
      for(var i = 0; i < csvData5.length; i++) {
        connection.query('INSERT INTO DailyIntensities (Id,ActivityDay,SedentaryMinutes,LightlyActiveMinutes,FairlyActiveMinutes,VeryActiveMinutes,SedentaryActiveDistance,LightActiveDistance,ModeratelyActiveDistance,VeryActiveDistance) VALUES ?;',
        [csvData5], (error, response) => {
          console.log(error || response);
        });
      }
    }
  });
});
stream5.pipe(csvStream5);
console.log("Added Daily Intensities data. DONE")

//dailySteps
let stream6 = fs.createReadStream("../dataset/dailySteps_merged.csv");
let csvData6 = [];
let csvStream6 = fastcsv
  .parse()
  .on("data", function(data) {
    csvData6.push(data);
  })
  .on("end", function() {
  // remove the first line: header
  csvData6.shift();

  // open the connection
  connection.connect(error => {
    if (error) {
      console.error(error);
    } else {
      for(var i = 0; i < csvData6.length; i++) {
        connection.query('INSERT INTO DailySteps (Id,ActivityDay,StepTotal) VALUES ?;',
        [csvData6], (error, response) => {
          console.log(error || response);
        });
      }
    }
  });
});
stream6.pipe(csvStream6);
console.log("Added Daily Steps data. DONE")

//sleepDay
let stream7 = fs.createReadStream("../dataset/sleepDay_merged.csv");
let csvData7 = [];
let csvStream7 = fastcsv
  .parse()
  .on("data", function(data) {
    csvData7.push(data);
  })
  .on("end", function() {
  // remove the first line: header
  csvData7.shift();

  // open the connection
  connection.connect(error => {
    if (error) {
      console.error(error);
    } else {
      for(var i = 0; i < csvData7.length; i++) {
        connection.query('INSERT INTO SleepDay (Id,SleepDay,TotalSleepRecords,TotalMinutesAsleep,TotalTimeInBed) VALUES ?;',
        [csvData7], (error, response) => {
          console.log(error || response);
        });
      }
    }
  });
});
stream7.pipe(csvStream7);
console.log("Added Sleep Day data. DONE")

