import React, {useState, useEffect} from "react";
import {Route} from "react-router-dom";
import SavedList from "./Articles/SavedList";
import ArticleList from "./Articles/ArticleList";
import Article from "./Articles/Article";
import axios from 'axios';
import UpdateArticle from "./Articles/UpdateArticle";
import AddArticle from "./Articles/AddArticle";

const Dashboard = () => {
  const [savedList, setSavedList] = useState([]);
  const [articleList, setArticleList] = useState([]);

  const getArticleList = () => {
    axios
      .get("http://localhost:5000/api/articles")
      .then(res => setArticleList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = article => {setSavedList([...savedList, article]);};

  useEffect(() => {getArticleList();}, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <ArticleList articles={articleList} />
      </Route>

      <Route path="/articles/:id">
        <Article articleList={articleList} setArticleList={setArticleList} addToSavedList={addToSavedList} />
      </Route>

      <Route path="/update-article/:id">
        <UpdateArticle articleList={articleList} setArticleList={setArticleList} />
      </Route>

      <Route path="/add-article">
        <AddArticle articleList={articleList} setArticleList={setArticleList} />
      </Route>
    </>
  );
};

export default Dashboard;
