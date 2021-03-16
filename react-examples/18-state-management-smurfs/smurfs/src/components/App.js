import React, {useEffect, useState} from "react";
import Smurfs from './Smurfs';
import SmurfForm from "./SmurfForm";
import {SmurfContext} from '../contexts/SmurfContext';
import axios from 'axios';
import "./App.css";

const App = () => {
  const [smurfs, setSmurfs] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3333/smurfs')
      .then(response => setSmurfs(response.data))
      .catch(error => console.log(error))
  }, [])

  return (
    <div className="App">
      <SmurfContext.Provider value={{smurfs, setSmurfs}}>
        <SmurfForm />
        <Smurfs />
      </SmurfContext.Provider>
    </div>
  );
}

export default App;