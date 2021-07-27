const fetch = require('node-fetch');

var trackingQuery = `query getDailyActivity($Purpose: String!){
    DailyActivity(Purpose: $Purpose, Id: 8877689391) {
        Id,
        ActivityDate
    }
  }`;

function sendQuery(query, i) {
    if(i<1000) {
        fetch('http://localhost:4000', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query,
            variables: {
                Purpose: "prescriptive sleep analytics"
            },
        })
        })
        .then(r => r.json())
        .then(data => {
            if(i % 100 == 0) process.stdout.write("#");
            sendQuery(query, i+1);
        });
    } else {
        console.log();
        console.log("----------");
        console.log();
		console.log("Test#1: Done.");
	}
}

console.log();
console.log("Test#1: Running..");
console.log("----------");
sendQuery(trackingQuery, 0);
