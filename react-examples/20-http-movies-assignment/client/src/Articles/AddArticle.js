import React, {useState} from 'react';
import {useHistory} from "react-router-dom";
import axios from 'axios';

const initialState = {
  title: '',
  author: '',
  link: '',
  categories: ['', '', ''],
}

const AddArticle = ({articleList, setArticleList}) => {
  const [article, setArticle] = useState(initialState);
  const {push} = useHistory();

  const handleChange = e => {
    if (e.target.name === 'categories') {
      const newCategories = article.categories.map((category, id) => {
        if (Number(e.target.id) === id) return e.target.value;
        return category;
      })
      setArticle({ ...article, [e.target.name]: newCategories})
    }
    else {setArticle({ ...article, [e.target.name]: e.target.value})}
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/articles`, article)
      .then((response) => setArticleList(response.data))
      .catch((error) => console.log(error.response));
    push('/');
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-control">
        <input
          name="title"
          placeholder="Title"
          value={article.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <input
          name="author"
          placeholder="Author"
          value={article.author}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <input
          name="link"
          placeholder="Link"
          value={article.link} 
          onChange={handleChange}
        />
      </div>
      {article.categories.map((category, id) => {
        return (
          <input
            key={id}
            name="categories"
            placeholder={`Category ${id + 1}`}
            id={id} value={category}
            onChange={handleChange}
          />)})}
      <button>Add Article</button>
    </form>
  );
}

export default AddArticle;