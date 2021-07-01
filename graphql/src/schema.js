const { gql } = require('apollo-server');

const typeDefs = gql`
  # SQLite table users
  type DailyActivities {
    id: Float
    activityDate: String
    TotalSteps: Int
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

  type Query {
    DailyActivities: [DailyActivities]
    DailyActivitiy(id: Float!): [DailyActivities]
  }
`;

module.exports = typeDefs;
