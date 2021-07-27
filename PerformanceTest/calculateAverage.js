
let fs = require('fs');

let ac_times = [];
let no_ac_times = [];

let ac_log = fs.readFileSync("../server/src/time_with_AC.log", 'utf8');
let no_ac_log = fs.readFileSync("../server/src/time_without_AC.log", 'utf8');

let lines = ac_log.split('\n');

for (var i = 0; i < lines.length; i++) {
    ac_times.push(lines[i].substr(19));
}
lines = no_ac_log.split('\n');
for (var i = 0; i < lines.length; i++) {
    no_ac_times.push(lines[i].substr(19));
}

function avg(values) {
    let average = 0;
    let t = 1;
    values.forEach(element => {
        average += (element - average) / t;
        t++;
    });
    return average;
}

console.log("Response time with plugin: " + avg(ac_times));
console.log("Response time with no plugin: " + avg(no_ac_times));