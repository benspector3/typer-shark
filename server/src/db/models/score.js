const knex = require('../knex');
const authUtils = require('../../utils/auth-utils');

class Score {

    static async listScoresByUserId(userId) {
        try {
            const query = 'SELECT * FROM scores WHERE user_id = ?';
            const { rows } = await knex.raw(query, [userId]);
            return rows;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    static async create({userId, wordsTyped, wordsMissed}) {
        try {
            const query = `INSERT INTO scores (user_id, words_typed, words_missed)
        VALUES (?, ?, ?) RETURNING *`;
            const { rows: [score] } = await knex.raw(query, [userId, wordsTyped, wordsMissed]);
            return score
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    static async deleteAll() {
        try {
            return knex.raw('TRUNCATE scores;');
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

module.exports = Score;
