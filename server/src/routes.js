const express = require('express');
const userController = require('./controllers/user');
const scoreController = require('./controllers/score');
const addModels = require('./middleware/add-models');
const checkAuthentication = require('./middleware/check-authentication');

const Router = express.Router();
Router.use(addModels);

// Create
Router.post('/users', userController.create);
Router.post('/users/login', userController.login);
Router.post('/scores', scoreController.createScore);

// Read
Router.get('/scores', scoreController.getScores);
Router.get('/users', userController.list);
Router.get('/users/:id', userController.show);
Router.get('/me', userController.showMe);
// checkAuthentication middleware is applied to only to this route (and /logged-in-secret)
Router.get('/logged-in-secret', checkAuthentication, (req, res) => {
  res.send({ msg: 'The secret is: there is no secret.' });
});

// Update
Router.patch('/users/:id', checkAuthentication, userController.update);

// Delete
Router.delete('/users/logout', userController.logout);

module.exports = Router;
