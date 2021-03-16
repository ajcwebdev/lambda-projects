import React, {useState, useContext} from 'react';
import axios from 'axios';
import {SmurfContext} from '../contexts/SmurfContext';

const initial = {
  name: '',
  age: '',
  height: '',
};

const SmurfForm = () => {
  const [smurf, setSmurf] = useState(initial);
  const {setSmurfs} = useContext(SmurfContext);

  const handleChange = event => {setSmurf({...smurf, [event.target.name]: event.target.value,})}

  const handleSubmit = event => {event.preventDefault();
    axios
      .post('http://localhost:3333/smurfs', {...smurf, age: smurf.age})
      .then(response => setSmurfs(response.data))
      .catch(error => console.log(error))
    setSmurf(initial);}

  return (
    <form onSubmit={handleSubmit}>
      Add Smurf
      <input name="name" value={smurf.name} onChange={handleChange} />
      <input name="age" value={smurf.age} onChange={handleChange} />
      <input name="height" value={smurf.height} onChange={handleChange} />
      <button>Submit</button>
    </form>
  );
}

export default SmurfForm;
