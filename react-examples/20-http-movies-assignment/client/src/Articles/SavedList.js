import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Articles:</h3>
      {list.map(article => {
        return (
          <NavLink
            to={`/articles/${article.id}`}
            key={article.id}
            activeClassName="saved-active"
          >
            {/* <span className="saved-article">{article.title}</span> */}
          </NavLink>
        );
      })}
      <div className="home-button">
        <Link to="/">Home</Link>
      </div>
      <div className="home-button">
        <Link to="/add-article">Add Article</Link>
      </div>
    </div>
  );
}

export default SavedList;
