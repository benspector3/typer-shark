/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('scores', table => {
      table.increments('id');
      table.integer('user_id');
      table.foreign('user_id').references('id').inTable('users');
      table.integer('words_typed');
      table.integer('words_missed');
    })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('scores');
  };
  