
exports.up = function(knex) {
  return knex.schema
    .createTable('ingredients', tbl => {
      tbl.increments();
      tbl.string('ingredient_name', 128)
        .notNullable();
    })
    .createTable('recipes', tbl => {
      tbl.increments();
      tbl.string('recipe_name', 128)
        .notNullable();
    })
    .createTable('instructions', tbl => {
      tbl.integer('step_number')
        .unsigned()
        .notNullable()
      tbl.string('description')
        .notNullable()
      tbl.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('recipes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
    .createTable('recipe_ingredients', tbl => {
      tbl.float('quantity')
        .unsigned()
        .notNullable()
      tbl.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('recipes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      tbl.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('ingredients')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      tbl.primary(['recipe_id', 'ingredient_id']);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('recipe_ingredients')
    .dropTableIfExists('instructions')
    .dropTableIfExists('recipes')
    .dropTableIfExists('ingredients')
};
