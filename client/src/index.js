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

const ID_TOTALSTEPS = gql`
  query {
    DailyActivities {
      Id,
      TotalSteps
    }
  }
`;

function IdTotalSteps() {

  const { loading, error, data } = useQuery(ID_TOTALSTEPS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ id, totalSteps }) => (
    <div key={id}>
      <p>
        {id}: {totalSteps}
      </p>
    </div>
  ));
}

function App() {
  return (
    <div>
      <h2>My first Apollo app 🚀</h2>

      <IdTotalSteps />
    </div>
  );
}



render(

  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
