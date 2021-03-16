const db = require('../data/dbConfig.js');

const find = () => {
  return db('users').select('id', 'username', 'department');
}

const findBy = (filter) => {
  return db('users').where(filter);
}

const add = async (user) => {
  try {
    const [id] = await db('users').insert(user);

    return await db('users').where({ id }).first();
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  find,
  findBy,
  add
}