const { gql } = require('apollo-server');

const typeDefs = gql`

  type Persons {
    Id: Float
    First_name: String
    Last_name: String
    Company_name: String
    Address: String
    City: String
    County: String
    State: String
    Zip: String
    Phone1: String
    Phone2: String
    Email: String
    Web: String
  }

  type DailyActivities {
    Id: Float
    ActivityDate: String
    TotalSteps: Float
    TotalDistance: Float
    TrackerDistance: Float
    LoggedActivitiesDistance: Float
    VeryActiveDistance: Float
    ModeratelyActiveDistance: Float
    LightActiveDistance: Float
    SedentaryActiveDistance: Float
    VeryActiveMinutes: Int
    FairlyActiveMinutes: Int
    LightlyActiveMinutes: Int
    SedentaryMinutes: Int
    Calories: Int
  }

  type HeartratePerSeconds {
    Id: Float
    Time: String
    Value: Int
  }

  type SleepDays {
    Id: Float
    SleepDay: String
    TotalSleepRecords: Int
    TotalMinutesAsleep: Int
    TotalTimeInBed: Int
  }

  type WeightPounds {
    Id: Float
    Date: String
    WeightKg: Float
    WeightPounds: Float
    Fat: Float
    BMI: Float
    IsManualReport: Boolean
    LogId: Float
  }

  type HourlyIntensities {
    Id: Float
    ActivityHour: String
    TotalIntensity: Int
    AverageIntensity: Float
  }

  type DailySteps {
    Id: Float
    ActivityDay: String
    StepTotal: Int
  }

  type DailyIntensities {
    Id: Float
    ActivityDay: String
    SedentaryMinutes: Int
    LightlyActiveMinutes: Int
    FairlyActiveMinutes: Int
    VeryActiveMinutes: Int
    SedentaryActiveDistance: Int
    LightActiveDistance: Float
    ModeratelyActiveDistance: Float
    VeryActiveDistance: Float
  }


  type Query {
    Persons: [Persons]

    DailyActivities(Purpose: String!): [DailyActivities]
    DailyActivity(Purpose: String!, Id: Float!): [DailyActivities]

    HeartratePerSeconds(Purpose: String!, Id: Float): [HeartratePerSeconds]

    SleepDays(Purpose: String!): [SleepDays]

    WeightPounds(Purpose: String!): [WeightPounds]

    HourlyIntensities(Purpose: String!): [HourlyIntensities]

    DailySteps(Purpose: String!): [DailySteps]

    DailyIntensities(Purpose: String!): [DailyIntensities]
  }

  type Mutation {
    InsertDailyActivity(
      Id: Float!
      ActivityDate: String!
      TotalSteps: Float
    ): DailyActivities
    DeleteDailyActivity(
      Id: Float!
      ActivityDate: String!): DailyActivities
  }
`;

module.exports = typeDefs;
