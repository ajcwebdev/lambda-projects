import React from 'react';
import { Route, Link } from 'react-router-dom'

const SavedList = props => (
  <div className="saved-list">
    <h3>Saved Movies:</h3>
    {props.list.map((movie, idx) => (<span key={idx} className="saved-movie">{movie.title}</span>))}
    <Route path={'/movies/:id'}>
      <Link to={'/'}><button className="home-button">Home</button></Link>
    </Route>
  </div>
);

export default SavedList;
