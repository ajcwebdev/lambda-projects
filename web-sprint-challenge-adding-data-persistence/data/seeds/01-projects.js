exports.seed = function(knex) {
  return knex('projects').truncate()
    .then(function () {
      return knex('projects').insert([
        { name: "Create website", description: "Blog, talks, podcasts" },
        { name: "Style website", description: "Layout, font, colors" }
      ]);
    });
};
