/* This seed file uses the existing `User` model to 
create new users with hashed passwords. To seed your 
database with other User data, update your model's `create` 
function to accept other input fields first before updating
this file.
*/
const User = require('../models/user');
const Score = require('../models/score');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // await User.deleteAll();
  // await User.create('cool_cat', 'password1');
  // await User.create('l33t-guy', 'password1');
  await Score.create({ userId: 2, wordsTyped: 15, wordsMissed: 5});
  await Score.create({ userId: 2, wordsTyped: 17, wordsMissed: 3});
  // await Score.create({ userId: 1, wordsTyped: 10, wordsMissed: 10});
};
