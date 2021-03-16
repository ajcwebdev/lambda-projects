exports.up = function(knex, Promise) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.text('VIN', 128).unique().notNullable();
    tbl.text('make').notNullable();
    tbl.text('model').notNullable();
    tbl.integer('mileage').unsigned().notNullable();
    tbl.text('transmission');
    tbl.text('title');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cars');
};

