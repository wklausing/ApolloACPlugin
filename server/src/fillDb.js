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
stream = fs.createReadStream("../dataset/fitbitData/heartrate_seconds_merged.csv");
csvData = [];
csvStream = fastcsv
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
        connection.query('INSERT INTO HeartratePerSeconds (Id,Time,Value) VALUES ?;',
        [csvData], (error, response) => {
          console.log(error || response);
        });
      }
    }
  });
});
stream.pipe(csvStream);
console.log("Added HeartratePerSeconds data.")

//Persons
stream = fs.createReadStream("../dataset/Persons.csv");
csvData = [];
csvStream = fastcsv
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
        connection.query('INSERT INTO Persons (Id,First_name,Last_name,Company_name,Address,City,County,State,Zip,Phone1,Phone2,Email,Web) VALUES ?;',
        [csvData], (error, response) => {
          console.log(error || response);
        });
      }
    }
  });
});
stream.pipe(csvStream);
console.log("Added Persons data. DONE")
