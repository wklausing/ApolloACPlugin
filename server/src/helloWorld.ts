const mysql = require("mysql2");
const csvtojson = require('csvtojson');

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mysql'
});

//database.connect();

con.connect((err) => {
    if (err) return console.error(
            'error: ' + err.message);

    con.query("DROP TABLE sample",
        (err, drop) => {

        // Query to create table "sample"
        var createStatament =
        "CREATE TABLE sample(Id int, Time date, Value int)"

        // Creating table "sample"
        con.query(createStatament, (err, drop) => {
            if (err)
                console.log("ERROR: ", err);
        });
    });
});

// CSV file name
const fileName = "../dataset/fitbitData/heartrate_seconds_merged.csv";

con.query(insertStatement, items,
    (err, results, fields) => {
    if (err) {
        console.log(
"Unable to insert item at row ", i + 1);
        return console.log(err);
    }
});

csvtojson().fromFile(fileName).then(source => {

    // Fetching the data from each row
    // and inserting to the table "sample"
    for (var i = 0; i < source.length; i++) {
        console.log("I: " + i)
        var Id = source[i]["Id"],
            Time = source[i]["Time"],
            Value = source[i]["Value"]

        con.query('INSERT INTO sample values(?, STR_TO_DATE(?, "%d/%m/%Y %h:%i:%s %p"), ?);', [Id,Time,Value], function(err, rows) {
            if(err){
                reject([]);
            }
            resolve(rows);
            //console.log(rows)
        });
    }
    console.log(
"All items stored into database successfully");
});
