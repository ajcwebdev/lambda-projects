import React from "react";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";

function ArticleList({ articles }) {
  return (
    <div className="article-list">
      {
        articles.map(article => (
          <Link key={article.id} to={`/articles/${article.id}`}>
            <ArticleCard article={article} />
          </Link>
        ))
      }
    </div>
  );
}

export default ArticleList;
