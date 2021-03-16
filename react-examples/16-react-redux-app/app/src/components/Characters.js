import React, {useEffect} from "react";
import {connect} from "react-redux";
import {fetchCharacters} from "../store/actions";
import Character from "./Character";

const Characters = ({fetchCharacters, characters, isFetching}) => {
  useEffect(() => {fetchCharacters();}, [fetchCharacters]);

  return (
    <div>
      {isFetching && <h3>Getting data...</h3>}
      <div className="container">
        {characters.map(character => {return <Character key={character.id} character={character} />;})}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {isFetching: state.reducer.isFetching, characters: state.reducer.characters};
};

export default connect(mapStateToProps, {fetchCharacters})(Characters);