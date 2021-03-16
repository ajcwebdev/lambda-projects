import React from "react";

const Character = ({character}) => {
  return (
    <div className="card">
      <img src={character.image} alt="" />
      <h2>{character.name}</h2>
      <h3>{character.species}</h3>
      <h3>{character.status}</h3>
    </div>
  );
};

export default Character;