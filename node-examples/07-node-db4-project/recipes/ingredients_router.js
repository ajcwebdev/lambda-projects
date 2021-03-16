const express = require('express');

const Recipes = require('./recipes-model');

const router = express.Router();

router.get('/:id/recipes', async (req, res) => {
  try {
    const recipes = await Recipes.getRecipesByIngredient(req.params.id);
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ error });
  }
})

module.exports = router;