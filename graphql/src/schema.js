const { gql } = require('apollo-server');

const typeDefs = gql`
  type DailyActivity {
    Id: Int
    ActivityDate: String
    TotalSteps: Int
    TotalDistance: Int
    TrackerDistance: Int
    LoggedActivitiesDistance: Int
    VeryActiveDistance: Int
    ModeratelyActiveDistance: Int
    LightActiveDistance: Int
    SedentaryActiveDistance: Int
    VeryActiveMinutes: Int
    FairlyActiveMinutes: Int
    LightlyActiveMinutes: Int
    SedentaryMinutes: Int
    Calories: Int
  }

  type Query {
    user(Id: Int!): DailyActivity
  }
`;

module.exports = typeDefs;
