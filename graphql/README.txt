#Install
npm install

#Start graphql server
node src/index.js

#SQLITE3 DB - Command um csv Datei in DB einzulesen
.import ../dataset/Persons.csv Persons --csv --skip 1
.import ../dataset/fitbitData/dailyActivity_merged.csv DailyActivities --csv
.import ../dataset/fitbitData/heartrate_seconds_merged.csv HeartratePerSeconds --csv

#Queries zum Testen

query{
  DailyActivities {
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

query{
  DailyActivity(Id: 8877689391){
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
