const db = require('../../data/db-config.js')

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where({ id }).first()
}

const create = account => {
  // DO YOUR MAGIC
  return db('accounts').insert(account)
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db('accounts').where({ id }).update(account)
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts').where({ id }).del()
}

const checkUnique = async name => {
  const found = await db('accounts').where({ name })
  return found;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  checkUnique,
}
