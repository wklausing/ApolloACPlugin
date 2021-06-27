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

  type Person {
    PersonID: Int
    LastName: String
    FirstName: String
    Address: String
    City: String
  }

  type Query {
    user(Id: Int!, ActivityDate: String!): DailyActivity
    person1(PersonID: Int): Person
  }
`;

module.exports = typeDefs;
