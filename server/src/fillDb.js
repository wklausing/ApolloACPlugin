const mysql = require("mysql2");
const fs = require("fs");
const fastcsv = require("fast-csv");

// create a new connection to the database
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test',
  database : 'fitbit'
});

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
      console.log("Daily Activities: Adding data..");
      for(var i = 0; i < csvData.length; i++) {
        connection.query('INSERT INTO DailyActivities (Id,ActivityDate,TotalSteps,TotalDistance,TrackerDistance,LoggedActivitiesDistance,VeryActiveDistance,ModeratelyActiveDistance,LightActiveDistance,SedentaryActiveDistance,VeryActiveMinutes,FairlyActiveMinutes,LightlyActiveMinutes,SedentaryMinutes,Calories) VALUES ?;',
        [csvData], (error, response) => {
          console.log(error || response);
        });
      }
      console.log("Daily Activities: Done")
    }
  });
});
stream.pipe(csvStream);

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
      console.log("HeartratePerSeconds: Adding data..");
      for(var i = 0; i < csvData2.length; i++) {
        connection.query('INSERT INTO HeartratePerSeconds (Id,Time,Value) VALUES ?;',
        [csvData2], (error, response) => {
          console.log(error || response);
        });
      }
      console.log("HeartratePerSeconds: Done")
    }
  });
});
stream2.pipe(csvStream2);

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
      console.log("Daily Calories: Adding data..");
      for(var i = 0; i < csvData4.length; i++) {
        connection.query('INSERT INTO DailyCalories (Id,ActivityDay,Calories) VALUES ?;',
        [csvData4], (error, response) => {
          console.log(error || response);
        });
      }
      console.log("Daily Calories: Done");
    }
  });
});
stream4.pipe(csvStream4);


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
      console.log("Daily Intensities: Adding data..");
      for(var i = 0; i < csvData5.length; i++) {
        connection.query('INSERT INTO DailyIntensities (Id,ActivityDay,SedentaryMinutes,LightlyActiveMinutes,FairlyActiveMinutes,VeryActiveMinutes,SedentaryActiveDistance,LightActiveDistance,ModeratelyActiveDistance,VeryActiveDistance) VALUES ?;',
        [csvData5], (error, response) => {
          console.log(error || response);
        });
      }
      console.log("Daily Intensities: Done");
    }
  });
});
stream5.pipe(csvStream5);

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
      console.log("Daily Steps: Adding data..");
      for(var i = 0; i < csvData6.length; i++) {
        connection.query('INSERT INTO DailySteps (Id,ActivityDay,StepTotal) VALUES ?;',
        [csvData6], (error, response) => {
          console.log(error || response);
        });
      }
      console.log("Daily Steps: Done");
    }
  });
});
stream6.pipe(csvStream6);

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
      console.log("Sleep Day: Adding data..");
      for(var i = 0; i < csvData7.length; i++) {
        connection.query('INSERT INTO SleepDays (Id,SleepDay,TotalSleepRecords,TotalMinutesAsleep,TotalTimeInBed) VALUES ?;',
        [csvData7], (error, response) => {
          console.log(error || response);
        });
      }
      console.log("Sleep Day: Done");
    }
  });
});
stream7.pipe(csvStream7);
