import React from 'react';
import { Route } from 'react-router-dom'

const MovieCard = props => {
  const {title, director, metascore, stars} = props.movie;
  
  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <Route path={'/movies/:id'}>
          <div className="movie-director">
            Director: <em>{director}</em>
          </div>
          <div className="movie-metascore">
            Metascore: <strong>{metascore}</strong>
          </div>
          <h3>Actors</h3>
          {stars.map(star => (<div key={star} className="movie-star">{star}</div>))}
        </Route>
      </div>
      <Route path={`/movies/:id`}>
        <button className="save-button">Save</button>
      </Route>
    </div>
  );
};

export default MovieCard;