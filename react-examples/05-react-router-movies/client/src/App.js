import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom'
import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList'
import Movie from './Movies/Movie'

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
      <Switch>
          <Route path={'/movies/:id'}>
            <Movie />
          </Route>
          <Route path={'/'}>
            <MovieList />
          </Route>
      </Switch>
    </div>
  );
};

export default App;
