import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Title from './components/layouts/Title';

import "./App.css";
import AddPerson from './components/forms/AddPerson';
import Persons from './components/lists/Persons';
import AddCar from './components/forms/AddCar';





function App() {


  return (
      <div className="App">
        <Title/>
        <AddPerson/>
        <AddCar/>
        <Persons/>
      </div>
  );
}

export default App;
