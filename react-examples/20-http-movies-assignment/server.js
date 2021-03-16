const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(CORS());

let articles = [
  {
    id: 0,
    title: "A short history of ReactJS",
    author: "AJC",
    link: "https://ajcwebdev.netlify.app/ajcwebdev/a-short-history-of-react/",
    categories: ["Web", "JavaScript", "Frontend"]
  },
  {
    id: 1,
    title: "A short history of NodeJS",
    author: "AJC",
    link: "https://ajcwebdev.netlify.app/ajcwebdev/a-short-history-of-node/",
    categories: ["Web", "JavaScript", "Backend"]
  }
];

let articleId = articles.length;

app.get("/api/articles", (req, res) => {
  res.send(articles);
});

app.get("/api/articles/:id", (req, res) => {
  const article = articles.filter(article => `${article.id}` === req.params.id)[0];
  res.status(200).json(article);
});

app.post("/api/articles", (req, res) => {
  if (req.body.title !== undefined) {
    const newArticle = req.body;
    newArticle["id"] = articleId;
    articles.push(newArticle);
  }
  ++articleId;
  res.status(201).json(articles);
});

app.put("/api/articles/:id", (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the article id");
  if (
    req.body.id === undefined ||
    !req.body.title ||
    !req.body.author ||
    !req.body.link ||
    !req.body.categories
  ) {
    res
      .status(422)
      .send("Make sure your request body has all the fields it needs");
  }
  articles = articles.map(article => {
    if (`${article.id}` === req.params.id) {
      return req.body;
    }
    return article;
  });
  res.status(200).send(req.body);
});

app.delete("/api/articles/:id", (req, res) => {
  if (!req.params.id)
    res.status(400).send("Your request is missing the article id");
  articles = articles.filter(article => `${article.id}` !== req.params.id);
  res.status(202).send(req.params.id);
});

app.get("/", function(req, res) {
  res.send("App is working 👍");
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
