const fetch = require('node-fetch');
let fs = require('fs');
const log = require('simple-node-logger').createSimpleFileLogger('response.log');
log.setLevel('info');

if (process.argv.length == 4) {
    if (!isNaN(process.argv[2])) {
        var testNumber = process.argv[2];
        var argPurpose = "";
        switch (testNumber) {
            case 1:
                argPurpose = "track activity";
                break;
            case 2:
                argPurpose = "track activity";
                break;
            case 3:
                argPurpose = "diagnostic sleep analytics";
                break;
            case 4:
                argPurpose = "influencer marketing";
                break;
                
        }
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

        sendQuery(query, argPurpose, 0);
    } else {
        console.log("Please use a number as additional parameter");
    }
} else {
    console.log("Please use an additional <integer> parameter")
}
