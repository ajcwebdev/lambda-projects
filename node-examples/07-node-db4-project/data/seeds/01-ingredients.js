
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('ingredients').del()
    .then(function () {
      // Inserts seed entries
      return knex('ingredients').insert([
        { ingredient_name: 'Broccoli'},
        { ingredient_name: 'Steak'},
        { ingredient_name: 'Rice'},
        { ingredient_name: 'Teriyaki' },
        { ingredient_name: 'Pizza' }
      ]);
    });
};
