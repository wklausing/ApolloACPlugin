const mysql = require("mysql2");
const fs = require("fs");
const fastcsv = require("fast-csv");

let stream = fs.createReadStream("../dataset/fitbitData/heartrate_seconds_merged.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
  // remove the first line: header
  csvData.shift();

  // create a new connection to the database
  const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mysql'
  });

  // open the connection
  connection.connect(error => {
    if (error) {
      console.error(error);
    } else {
      for(var i = 0; i < csvData.length; i++) {
        connection.query('INSERT INTO HeartratePerSeconds (Id, Time, Value) VALUES (?, STR_TO_DATE(?, "%d/%m/%Y %h:%i:%s %p"), ?);',
        [csvData[i][0],csvData[i][1],csvData[i][2]], (error, response) => {
          console.log(error || response);
        });
      }
    }
  });
});

stream.pipe(csvStream);
