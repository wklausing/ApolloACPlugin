const fetch = require('node-fetch');

var trackingQuery = `query getDailyActivity($Purpose: String!){
    Person(Purpose:$Purpose, Id:4020332650) {
      First_name,
      Last_name,
      Company_name,
      Address,
      City,
      County,
      State,
      Zip,
      Phone1,
      Phone2,
      Email,
      Web,
    }
    DailyActivityDay(Purpose:$Purpose, Id: 4020332650, Time:"4/12/2016"){
        ActivityDate,
      TotalSteps,
      TotalDistance,
      TrackerDistance,
      LoggedActivitiesDistance,
      VeryActiveDistance,
      ModeratelyActiveDistance,
      LightActiveDistance,
      SedentaryActiveDistance,
      VeryActiveMinutes,
      FairlyActiveMinutes,
      LightlyActiveMinutes,
      SedentaryMinutes,
      Calories,
    },
    HeartratePerSecondsDay(Purpose:$Purpose, Id: 4020332650, Time: "4/12/2016"){
        Time,
      Value,
    },
    SleepDay(Purpose: $Purpose, Id:4020332650, Time:"4/12/2016"){
      SleepDay,
      TotalSleepRecords,
      TotalMinutesAsleep,
      TotalTimeInBed,
    },
    WeightPoundsOf(Purpose: $Purpose, Id:4020332650){
      Date,
      WeightKg,
      WeightPounds,
      Fat,
      BMI,
      IsManualReport,
    },
    DailyStepsDay(Purpose: $Purpose, Id:4020332650, Time:"4/12/2016" ){
      ActivityDay,
      StepTotal
    },
    DailyIntensitiesDay(Purpose: $Purpose, Id:4020332650, Time:"4/12/2016" ){
      ActivityDay,
      SedentaryMinutes,
      LightlyActiveMinutes,
      FairlyActiveMinutes,
      VeryActiveMinutes,
      SedentaryActiveDistance,
      LightActiveDistance,
      ModeratelyActiveDistance,
      VeryActiveDistance,
    },
  }
  `;

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
