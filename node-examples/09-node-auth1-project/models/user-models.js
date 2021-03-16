const db = require('../data/dbConfig');

const add = (user) => {
  return db('users').insert(user)
}

const find = () => {
  return db('users');
}

const findByUsername = (username) => {
  return db('users').where({ username }).first();
}

module.exports = {
  find,
  findByUsername,
  add
}