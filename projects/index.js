const router = require('express').Router()
const db = require('../data/dbConfig.js');

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('projects')
    .where({ id })
    .first()
    .then(project => {
      const payload = {
        ...project,
        completed: project.completed ? 'true' : 'false'
      }
      db('actions')
        .select('id', 'description', 'notes', 'completed')
        .where({ project_id: id })
        .then(actions => {
          payload.actions = actions.map(action => ({
            ...action,
            completed: action.completed ? 'true' : 'false'
          }));
          res.status(200).json(payload);
        })
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  const project = {
    ...req.body, completed: req.body.completed || false
  }
  db('projects')
    .insert(project)
    .then(count => {
      res.status(201).json(count)
    })
    .catch(err => {
      res.status(500).json(err);
    });
})



module.exports = router;