const { gql } = require('apollo-server');

const typeDefs = gql`

  type DailyActivities {
    id: Float
    activityDate: String
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
    DailyActivity(id: Float!): [DailyActivities]

    HeartratePerSeconds(id: Float): [HeartratePerSeconds]
  }

  type Mutation {
    InsertDailyActivity(
      id: Float!
      activityDate: String!
      TotalSteps: Float
    ): DailyActivities
    DeleteDailyActivity(
      id: Float!
      activityDate: String!): DailyActivities
  }
`;

module.exports = typeDefs;
