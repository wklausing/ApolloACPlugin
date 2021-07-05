Queries zum Testen

query{
  DailyActivities {
    id,
    activityDate,
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
  DailyActivity(id: 8877689391){
    id,
    activityDate,
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
  InsertDailyActivity(id: 21, activityDate: "5/12/2021", TotalSteps: 500) {
    id,
    activityDate,
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

Command um csv Datei in DB einzulesen
.import /Users/wkl/git/PENG/dataset/fitbitData/heartrate_seconds_merged.csv HeartratePerSeconds --csv
