
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table) {
    //table description below
    table.increments()
    table.varchar('name', 255).notNullable()
    table.varchar('message', 255).notNullable()
    table.timestamps(true, true)
  })
};
exports.down = function(knex, Promise) {
   return knex.schema.dropTableIfExists('tablename')
};
