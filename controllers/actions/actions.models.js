const db = require('../../data/dbConfig.js');

const insertAction = action =>
  db('actions')
    .insert(action)

const getAction = id =>
  db('actions')
    .where({ id })
    .first()

const deleteAction = id =>
  db('actions')
    .where({ id })
    .first()
    .del()

const updateAction = (id, body) =>
  db('actions')
    .where({ id })
    .update(body)


module.exports = {
  insertAction,
  getAction,
  deleteAction,
  updateAction
}