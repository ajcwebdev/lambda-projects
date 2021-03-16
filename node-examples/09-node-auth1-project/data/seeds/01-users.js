exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        { username: 'Bob', password: 'pass1234' }
      ]);
    });
};
