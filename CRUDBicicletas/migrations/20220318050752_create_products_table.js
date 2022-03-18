exports.up = function(knex) {
    return knex.schema
      .createTable('bicicletas', (table) => {
        table.increments('id');
        table.string('modelo', 255).notNullable();
        table.string('color', 512).notNullable();
        table.float('lat').notNullable();
        table.float('lon').notNullable();
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('bicicletas');
  };