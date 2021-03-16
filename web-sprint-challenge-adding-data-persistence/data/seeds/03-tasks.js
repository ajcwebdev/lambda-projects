exports.seed = function (knex) {
  return knex('tasks').truncate()
    .then(function () {
      return knex('tasks').insert([
        { project_id: 1, description: "Blog page", notes: "Takes Markdown" },
        { project_id: 1, description: "Podcast page", notes: "Links to podcast player" },
        { project_id: 2, description: "Pick CSS library", notes: "Tailwind or other?" },
        { project_id: 2, description: "Pick font", notes: "Research different fonts" },
      ]);
    });
};

