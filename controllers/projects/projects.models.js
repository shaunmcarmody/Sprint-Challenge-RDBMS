const db = require('../../data/dbConfig.js');

const insertProject = project =>
  db('projects')
    .insert(project)

const getProject = id =>
  db('projects')
    .where('id', id)
    .first()

const deleteProject = id =>
  db('projects')
    .where('id', id)
    .first()
    .del()

const updateProject = (id, body) =>
  db('projects')
    .where('id', id)
    .update(body)

const getProjectActions = id =>
  db('actions')
    .select('id', 'description', 'notes', 'completed')
    .where('project_id', id)



module.exports = {
  insertProject,
  getProject,
  deleteProject,
  updateProject,
  getProjectActions
}