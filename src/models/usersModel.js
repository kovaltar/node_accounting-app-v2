const { getAll, getById, deleteById } = require('../utils/helpers');

let nextUserId = 1;
const users = [];
const usersKeys = ['name'];

function getAllUsers() {
  return getAll(users);
}

function getUserById(id) {
  return getById(users, id);
}

function deleteUser(id) {
  return deleteById(users, id);
}

function createUser(name) {
  const user = { id: nextUserId++, name };

  users.push(user);

  return user;
}

function updateUser(id, data) {
  const user = users.find((usr) => usr.id === id);

  if (!user) {
    return null;
  }

  for (const key in data) {
    if (usersKeys.includes(key)) {
      user[key] = data[key];
    }
  }

  return user;
}

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
};
