
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('recipes').del()
    .then(function () {
      // Inserts seed entries
      return knex('recipes').insert([
        { recipe_name: 'Beef Teriyaki'},
        { recipe_name: 'Pizza'},
        { recipe_name: 'Steak Dinner' }
      ]);
    });
};
