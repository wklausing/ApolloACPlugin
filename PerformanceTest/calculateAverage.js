
let fs = require('fs');

let ac_times = [];
let no_ac_times = [];

let testNumber = 4;
let merge = false;
let ac_log2, no_ac_log2, lines2;

let ac_log = fs.readFileSync("../server/src/test" + testNumber +testNumber +"_with_AC.log", 'utf8');
let no_ac_log = fs.readFileSync("../server/src/test" + testNumber +testNumber + "_without_AC.log", 'utf8');
if(merge) {
    ac_log2 = fs.readFileSync("../server/src/test" + testNumber + testNumber +"_with_AC.log", 'utf8');
    no_ac_log2 = fs.readFileSync("../server/src/test" + testNumber + testNumber + "_without_AC.log", 'utf8');
}

let lines = ac_log.split('\n');
if(merge) lines2 = ac_log2.split('\n');

for (var i = 0; i < lines.length; i++) {
    ac_times.push(lines[i].substr(19));
    if(merge) ac_times.push(lines2[i].substr(19));
}
lines = no_ac_log.split('\n');
if(merge) lines2 = no_ac_log2.split('\n');
for (var i = 0; i < lines.length; i++) {
    no_ac_times.push(lines[i].substr(19));
    if(merge) no_ac_times.push(lines2[i].substr(19));
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

console.log(avg(ac_times));
console.log(avg(no_ac_times));