const express = require('express');
const expensesController = require('../controllers/expensesController');
const expensesRouter = express.Router();

expensesRouter.get('/', expensesController.get);
expensesRouter.get('/:id', expensesController.getOne);
expensesRouter.post('/', expensesController.create);
expensesRouter.patch('/:id', expensesController.update);
expensesRouter.delete('/:id', expensesController.remove);

module.exports = expensesRouter;
