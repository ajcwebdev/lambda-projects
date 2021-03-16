const db = require('../data/dbConfig');

module.exports = {
  getRecipes,
  getShoppingList,
  getInstructions,
  getRecipesByIngredient,
  getRecipeDetailed
}

function getRecipes() {
  return db('recipes');
}

async function getRecipeDetailed(id) {
  const recipe = await db('recipes').where({ id });
  const list = await getShoppingList(id);
  const instructions = await getInstructions(id);
  return {...recipe[0], ingredients: [...list], instructions: instructions.map(inst => {
    return { step_number: inst.step_number, description: inst.description }
  })};
}

function getShoppingList(recipe_id) {
  return db('recipe_ingredients')
    .where({ recipe_id })
    .join('ingredients', 'recipe_ingredients.ingredient_id', '=', 'ingredients.id')
    .select('ingredients.ingredient_name', 'recipe_ingredients.quantity')
}

function getInstructions(recipe_id) {
  return db('instructions')
    .where({ recipe_id })
    .orderBy('instructions.step_number')
}

function getRecipesByIngredient(ingredient_id) {
  return db('recipe_ingredients')
    .where({ ingredient_id })
    .join('recipes', 'recipes.id', '=', 'recipe_ingredients.recipe_id')
    .select('recipes.recipe_name')
}