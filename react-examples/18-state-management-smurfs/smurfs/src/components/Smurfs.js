import React, {useContext} from 'react';
import Smurf from './Smurf';
import {SmurfContext} from '../contexts/SmurfContext';

const Smurfs = () => {
  const {smurfs} = useContext(SmurfContext);

  return (
    <>
    Smurfs
      {smurfs.map(smurf => {return <Smurf key={smurf.id} {...smurf} />})}
    </>
  );
}

export default Smurfs;