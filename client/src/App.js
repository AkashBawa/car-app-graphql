import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Title from './components/layouts/Title';

import "./App.css"
import AddPerson from './components/forms/AddPerson';
import Persons from './components/lists/Persons';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Title/>
        <AddPerson/>
        <Persons/>
      </div>
    </ApolloProvider>
    
  );
}

export default App;
