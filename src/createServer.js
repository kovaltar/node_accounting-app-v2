'use strict';

const express = require('express');
const expensesModel = require('./models/expensesModel');
const usersModel = require('./models/usersModel');
const usersRouter = require('./routes/usersRoutes.js');
const expensesRouter = require('./routes/expensesRoutes.js');

function createServer() {
  if (process.env.NODE_ENV === 'test') {
    usersModel.resetUsers();
    expensesModel.resetExpenses();
  }

  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
