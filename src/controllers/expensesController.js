const expensesModel = require('../models/expensesModel');
const usersModel = require('../models/usersModel');

function get(req, res) {
  let allExpenses = expensesModel.getAllExpenses();
  const { userId, from, to, category } = req.query;

  // if (!allExpenses.length) {
  //   return res.status(404).json({ message: 'Expenses not found' });
  // }
  if (userId) {
    allExpenses = allExpenses.filter((exp) => exp.userId === +userId);
  }

  if (category) {
    allExpenses = allExpenses.filter((exp) => exp.category === category);
  }

  if (from || to) {
    const fromDate = from ? new Date(from) : new Date('0000-01-01');
    const toDate = to ? new Date(to) : new Date(Date.now());

    allExpenses = allExpenses.filter((exp) => {
      const spentAt = new Date(exp.spentAt);

      return spentAt >= fromDate && spentAt <= toDate;
    });
  }
  res.status(200).json(allExpenses);
}

function getOne(req, res) {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  const expense = expensesModel.getExpenseById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.status(200).json(expense);
}

function create(req, res) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const uid = +userId;

  if (isNaN(uid)) {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  const user = usersModel.getUserById(uid);

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  if (isNaN(Date.parse(spentAt))) {
    return res.status(400).json({ message: 'Invalid spentAt format' });
  }

  if (typeof title !== 'string') {
    return res.status(400).json({ message: 'Invalid title' });
  }

  if (typeof amount !== 'number') {
    return res.status(400).json({ message: 'Invalid anount' });
  }

  if (typeof category !== 'string') {
    return res.status(400).json({ message: 'Invalid category' });
  }

  if (typeof note !== 'string') {
    return res.status(400).json({ message: 'Invalid note' });
  }

  const expense = expensesModel.createExpense({
    userId: uid,
    spentAt: new Date(spentAt).toISOString(),
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
}

function remove(req, res) {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  const expense = expensesModel.getExpenseById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  expensesModel.deleteExpense(id);
  res.status(204).json({ message: 'Expense deleted' });
}

function update(req, res) {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  const body = req.body;
  const expense = expensesModel.getExpenseById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  if (body.userId && !usersModel.getUserById(body.userId)) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (body.title && typeof body.title !== 'string') {
    return res.status(400).json({ message: 'Invalid title format' });
  }

  if (body.amount && typeof body.amount !== 'number') {
    return res.status(400).json({ message: 'Invalid amount format' });
  }

  if (body.category && typeof body.category !== 'string') {
    return res.status(400).json({ message: 'Invalid category format' });
  }

  if (body.spentAt && isNaN(Date.parse(body.spentAt))) {
    return res.status(400).json({ message: 'Invalid spentAt format' });
  }

  if (body.note !== undefined && typeof body.note !== 'string') {
    return res.status(400).json({ message: 'Invalid note format' });
  }

  const updatedExpense = expensesModel.updateExpense(id, body);

  res.status(200).json(updatedExpense);
}

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
