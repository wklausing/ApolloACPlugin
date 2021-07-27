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
mutation insertActivity($Purpose: String!){
  InsertDailyActivity(Purpose: $Purpose, Id: 21, ActivityDate: "5/12/2021", TotalSteps: 500) {
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
