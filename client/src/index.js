import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

// const client = ...

client
  .query({
    query: gql`
    query {
      DailyActivities {
        Id
        ActivityDate
        TotalSteps
        TotalDistance
        TrackerDistance
        LoggedActivitiesDistance
        VeryActiveDistance
        ModeratelyActiveDistance
        LightActiveDistance
        SedentaryActiveDistance
        VeryActiveMinutes
        FairlyActiveMinutes
        LightlyActiveMinutes
        SedentaryMinutes
        Calories
      }
    }
    `
  })
  .then(result => console.log(result));
