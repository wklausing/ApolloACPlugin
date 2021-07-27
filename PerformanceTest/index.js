const fetch = require('node-fetch');

var trackingQuery = `query getDailyActivity($purpose: String!){
    DailyActivity(Purpose: $purpose, Id: 8877689391) {
      Id
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
            purpose: "health"
        },
    })
    })
    .then(r => r.json())
    .then(data => {
        sendQuery(i+1);
    });
    } else {
		console.log("Test#1: Done.");
	}
}

console.log("Test#1: Running..");
sendQuery(trackingQuery, 0);
