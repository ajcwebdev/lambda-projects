exports.seed = function (knex) {
  return knex('resources').truncate()
    .then(function () {
      return knex('resources').insert([
        { name: "Computer", description: "Mac laptop" },
        { name: "Microphone", description: "Amazon Basic" }
      ]);
    });
};
