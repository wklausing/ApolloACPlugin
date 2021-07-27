const fetch = require('node-fetch');
let fs = require('fs');
const log = require('simple-node-logger').createSimpleFileLogger('response.log');
log.setLevel('info');


var testNumber = 3;
var query = fs.readFileSync('test' + testNumber + '.txt', 'utf8');

function sendQuery(query, purpose, i) {
    if (i < 1000) {
        fetch('http://localhost:4000', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: {
                    Purpose: purpose
                },
            })
        })
            .then(r => r.json())
            .then(data => {
                if (i == 0) log.info(JSON.stringify(data, null, 2));
                if (i % 100 == 0) process.stdout.write("#");
                sendQuery(query, purpose, i + 1);
            });
    } else {
        console.log();
        console.log("----------");
        console.log();
        console.log("Test #" + testNumber + ": Done.");
    }
}

console.log();
console.log("Test #" + testNumber + ": Running..");
console.log("----------");

sendQuery(query, "track activity", 0);

