const express = require('express');

const Recipes = require('./recipes-model');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const recipes = await Recipes.getRecipes();
    res.status(200).json(recipes)
  } catch(error) {
    res.status(500).json({ error });
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipes.getRecipeDetailed(id);
    res.status(200).json(recipe);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error });
  }
})


router.get('/:id/shopping-list', async (req, res) => {
  try {
    const list = await Recipes.getShoppingList(req.params.id);
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error });
  }
})

router.get('/:id/instructions', async (req, res) => {
  try {
    const instructions = await Recipes.getInstructions(req.params.id);
    res.status(200).json(instructions);
  } catch (error) {
    res.status(500).json({ error });
  }
})

module.exports = router;