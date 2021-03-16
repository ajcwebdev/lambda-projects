import React from 'react';

const ArticleCard = props => {
  const { title, author, link, categories } = props.article;
  return (
    <div className="article-card">
      <h2>{title}</h2>
      <div className="article-author">{author}</div>
      <div className="article-link">{link}</div>
      <h3>Categories</h3>
      {categories.map(category => (
        <div key={category} className="article-category">
          {category}
        </div>
      ))}
    </div>
  );
};

export default ArticleCard;
