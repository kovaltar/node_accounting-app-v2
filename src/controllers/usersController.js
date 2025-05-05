const usersModel = require('../models/usersModel.js');

function get(req, res) {
  const allUsers = usersModel.getAllUsers();

  // if (!allUsers.length) {
  //   return res.status(404).json({ message: 'Users not found' });
  // }

  res.status(200).json(allUsers);
}

function getOne(req, res) {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  const user = usersModel.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(user);
}

function create(req, res) {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const user = usersModel.createUser(name);

  res.status(201).json(user);
}

function remove(req, res) {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  const user = usersModel.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  usersModel.deleteUser(id);
  res.status(204).end();
}

function update(req, res) {
  const id = +req.params.id;

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid ID' });
  }

  const body = req.body;

  const user = usersModel.getUserById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!body.name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const updatedUser = usersModel.updateUser(id, body);

  res.status(200).json(updatedUser);
}

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
