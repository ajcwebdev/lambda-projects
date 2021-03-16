
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('instructions').del()
    .then(function () {
      // Inserts seed entries
      return knex('instructions').insert([
        { step_number: 1, description: 'Prepare ingredients', recipe_id: 1 },
        { step_number: 2, description: 'Cook ingredients', recipe_id: 1 },
        { step_number: 1, description: 'Order Pizza', recipe_id: 2 },
        { step_number: 1, description: 'Grill steak', recipe_id: 3 },
        { step_number: 2, description: 'Eat the steak', recipe_id: 3 }
      ]);
    });
};
