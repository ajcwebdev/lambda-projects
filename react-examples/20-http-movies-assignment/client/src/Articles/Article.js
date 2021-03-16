import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import { Link } from "react-router-dom";

function Article({ addToSavedList, articleList, setArticleList }) {
  const [article, setArticle] = useState(null);
  const params = useParams();

  const fetchArticle = (id) => {
    axios
      .get(`http://localhost:5000/api/articles/${id}`)
      .then((res) => setArticle(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveArticle = () => {addToSavedList(article);};

  useEffect(() => {
    fetchArticle(params.id);
  }, [params.id]);

  if (!article) {
    return <div>Loading article information...</div>;
  }

  const deleteArticle = () => {
    axios
      .delete(`http://localhost:5000/api/articles/${params.id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    setArticleList(articleList.filter(article => Number(article.id) !== Number(params.id)));
  }

  return (
    <div className="save-wrapper">
      <ArticleCard article={article} />

      <div className="save-button" onClick={saveArticle}>
        Save
      </div>
      <Link to={`/update-article/${article.id}`}>Update</Link>
      <Link to={`/`} onClick={deleteArticle}>Delete</Link>
    </div>
  );
}

export default Article;
