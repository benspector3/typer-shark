const User = require('../db/models/user');
const Score = require('../db/models/score');

const addModels = (req, res, next) => {
  req.db = {
    User, Score
  };
  next();
};

module.exports = addModels;
