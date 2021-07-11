const { gql } = require('apollo-server');

const typeDefs = gql`

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

  type Query {
    DailyActivities: [DailyActivities]
    DailyActivity(Id: Float!): [DailyActivities]

    HeartratePerSeconds(Id: Float): [HeartratePerSeconds]
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
