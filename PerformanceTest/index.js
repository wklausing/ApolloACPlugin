const fetch = require('node-fetch');

var query = `query getDailyActivity($purpose: String!){
    DailyActivity(Purpose: $purpose, Id: 8877689391) {
      Id
      ActivityDate
    }
  }`;

function sendQuery(i) {
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
        console.log('Response #'+i); 
        sendQuery(i+1);
    });
    }
}

sendQuery(0);
