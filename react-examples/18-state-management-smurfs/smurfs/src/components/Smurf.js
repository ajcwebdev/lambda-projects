import React from 'react';

const Smurf = ({name, age, height}) => {
  return (
    <div>
      <h1>{name}</h1>
      <h2>{age}</h2>
      <h3>{height}</h3>
    </div>
  );
}

export default Smurf;