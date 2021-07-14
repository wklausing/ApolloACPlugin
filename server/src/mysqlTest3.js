const fs = require("fs");
const fastcsv = require("fast-csv");
const {database} = require("./db");

var Id = 1
var Time = "4/12/2016 7:21:00 AM"
var Value = 999

database.query('INSERT INTO sample values(?, STR_TO_DATE(?, "%d/%m/%Y %h:%i:%s %p"), ?);', [Id,Time,Value], function(err, rows) {
    if(err){
        reject([]);
    }
    //resolve(rows);
    //console.log(rows)
});
