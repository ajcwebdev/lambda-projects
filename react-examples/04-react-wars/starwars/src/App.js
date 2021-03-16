import React, { useState, useEffect } from "react";
import Character from "./components/Character";
import axios from "axios";
import "./App.css";
import { Container } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    axios.get(`https://rickandmortyapi.com/api/character`)
      .then(response => setCharacters(response.data.results))
      .catch(error => console.log('ERROR: ', error))
  }, [])

  const filterCharacters = () => {
    return characters.filter(character => {
      const values = [character.name, character.species, character.status, character.origin.name];

      return values.reduce((accumulator, value) => {
        if (value.toLowerCase().includes(search.toLowerCase())) accumulator = true;
        return accumulator;
      }, false);
    });
  };

  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
      <Container className="card-container">
        {filterCharacters().map(character => {
          return <Character key={character.id} character={character} />;
        })}
      </Container>
    </div>
  );
}

export default App;