import React from 'react';
import { render } from 'react-dom';
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

const gQuery = gql`
query getDailyActivity($purpose: String!){
  DailyActivity(Purpose: $purpose, Id: 8877689391) {
    Id
    ActivityDate
  }
}
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(gQuery, {
    variables: {
      purpose: "health"
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return data.DailyActivity.map(({ Id, ActivityDate }) => (
    <div key={Id}>
      <p>
        {Id}: {ActivityDate}
      </p>
    </div>
  ));
}

function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>

      <ExchangeRates />
    </div>
  );
}



render(

  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
