#Install MySQL database
brew install mysql

#Start MySQL database
mysql.server start

#Install dependencies
npm install

#Fill database with values
node src/fillDb.js

#Start graphql server
node src/index.js

#Queries zum Testen


## alle informationen von der Datenbank
```
query getDailyActivity($Purpose: String!){
  Person(Purpose:$Purpose, Id:2022484408) {
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
  DailyActivity(Purpose:$Purpose, Id: 2022484408){
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
  HeartratePerSeconds(Purpose:$Purpose, Id: 2022484408, Time: "4/12/2016"){
  	Time,
    Value,
  },
  SleepDaysOf(Purpose: $Purpose, Id:2022484408 ){
    SleepDay,
    TotalSleepRecords,
    TotalMinutesAsleep,
    TotalTimeInBed,
  },
  WeightPoundsOf(Purpose: $Purpose, Id:2022484408 ){
    Date,
    WeightKg,
    WeightPounds,
    Fat,
    BMI,
    IsManualReport,
  },
  HourlyIntensitiesOf(Purpose: $Purpose, Id:2022484408 ){
    ActivityHour,
    TotalIntensity,
    AverageIntensity,
  },
  DailyStepsOf(Purpose: $Purpose, Id:2022484408 ){
    ActivityDay,
    StepTotal
  },
  DailyIntensitiesOf(Purpose: $Purpose, Id:2022484408 ){
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
```



query getDailyActivity($Purpose: String!){
  DailyActivity(Purpose: $Purpose){
    Id,
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
    Calories
  }
}

query getDailyActivity($Purpose: String!){
  DailyActivity(Purpose: $Purpose, Id: 8877689391){
    Id,
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
    Calories
  }
}

Mutation zum testen
* Wirft Fehler falls Eintrag schon existiert
mutation{
  InsertDailyActivity(Id: 21, ActivityDate: "5/12/2021", TotalSteps: 500) {
    Id,
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
    Calories
  }
}
