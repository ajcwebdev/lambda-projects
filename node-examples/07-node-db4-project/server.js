const express = require('express');
const recipeRoutes = require('./recipes/recipes_router');
const ingredientRoutes = require('./recipes/ingredients_router');

const server = express();

server.use(express.json());

server.use('/api/recipes', recipeRoutes);
server.use('/api/ingredients', ingredientRoutes);

server.get('/', (req, res) => {
  res.status(200).json('UP and RUNNING');
})

module.exports = server;