import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from "react-router-dom";
import axios from 'axios';

 const initialState = {
  title: '',
  author: '',
  link: '',
  categories: ['', '', ''],
}

const UpdateArticle = ({articleList, setArticleList}) => {
  const [article, setArticle] = useState(initialState);
  const params = useParams();
  const {push} = useHistory();

  const getArticle = (id) => {
    axios
      .get(`http://localhost:5000/api/articles/${id}`)
      .then((response) => setArticle(response.data))
      .catch((error) => console.log(error.response));
  };

  useEffect(() => {getArticle(params.id);}, [params.id])

  const handleChange = e => {
    if(e.target.name === 'categories') {
      const newCategories = article.categories.map((category, id) => {
        if (Number(e.target.id) === id) return e.target.value;
        return category;
      })
      setArticle({...article, [e.target.name]: newCategories})
    }
    else {setArticle({ ...article, [e.target.name]: e.target.value})}
  }

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/articles/${params.id}`, article)
      .then((response) => console.log(response))
      .catch((error) => console.log(error.response));

    const newArticleList = articleList.map(event => {
      if(Number(event.id) === Number(params.id)) return article;
      return event;
    });
    setArticleList(newArticleList);
    push('/');
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          name="title"
          value={article.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <input
          name="author"
          value={article.author}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <input
          name="link"
          value={article.link}
          onChange={handleChange}
        />
      </div>
      {article.categories.map((category, id) => {
        return (
          <input
            key={id}
            name="categories"
            id={id}
            value={category}
            onChange={handleChange}
          />)
      })}
      <button>Update Article</button>
    </form>
  );
}

export default UpdateArticle;