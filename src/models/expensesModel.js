const { getAll, getById, deleteById } = require('../utils/helpers');
let nextExpenseId = 1;

const expenses = [];
const expensesKeys = [
  'userId',
  'spentAt',
  'title',
  'amount',
  'category',
  'note',
];

function getAllExpenses() {
  return getAll(expenses);
}

function getExpenseById(id) {
  return getById(expenses, id);
}

function deleteExpense(id) {
  return deleteById(expenses, id);
}

function createExpense(data) {
  const expense = { id: nextExpenseId++, ...data };

  expenses.push(expense);

  return expense;
}

function updateExpense(id, data) {
  const expense = expenses.find((exp) => exp.id === id);

  if (!expense) {
    return null;
  }

  for (const key in data) {
    if (expensesKeys.includes(key)) {
      expense[key] = data[key];
    }
  }

  return expense;
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  deleteExpense,
  createExpense,
  updateExpense,
};
