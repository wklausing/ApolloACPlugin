let fs = require('fs');

let ac_log =  fs.readFileSync("../server/src/time_with_AC.log", 'utf8');

let lines = ac_log.split('\n');
let ac_times = [element ];
for(var i = 0;i < lines.length;i++){
    lines[i].substr(19);
}