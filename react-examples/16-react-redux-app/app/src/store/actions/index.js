import axios from 'axios';

export const FETCH_CHAR_START = 'FETCH_CHAR_START';
export const FETCH_CHAR_SUCCESS = 'FETCH_CHAR_SUCCESS';
export const FETCH_CHAR_FAILURE = 'FETCH_CHAR_FAILURE';

export const fetchCharacters = () => {
  return dispatch => {
    dispatch({type: FETCH_CHAR_START});
    axios
      .get('https://rickandmortyapi.com/api/character')
      .then(response => {dispatch({type: FETCH_CHAR_SUCCESS, payload: response.data.results});})
      .catch(error => console.log(error));
  };
};
