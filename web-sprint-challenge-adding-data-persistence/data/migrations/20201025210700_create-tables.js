exports.up = function (knex) {
  return knex.schema.createTable('projects', tbl => {
      tbl.increments();
      tbl.string('name', 128).notNullable();
      tbl.string('description');
      tbl.boolean('completed').defaultTo(false);
    })
    .createTable('resources', tbl => {
      tbl.increments();
      tbl.string('name', 128).unique().notNullable();
      tbl.string('description');
    })
    .createTable('tasks', tbl => {
      tbl.increments();
      tbl.string('description').notNullable();
      tbl.string('notes');
      tbl.boolean('completed').defaultTo(false);
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
    .createTable('project_resources', tbl => {
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('resources')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      tbl.primary(['project_id', 'resource_id']);
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
