'use strict';

const express = require('express');
const usersRouter = require('./routes/usersRoutes.js');
const expensesRouter = require('./routes/expensesRoutes.js');

function createServer() {
  const app = express();

  app.use('/users', express.json(), usersRouter);
  app.use('/expenses', express.json(), expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
