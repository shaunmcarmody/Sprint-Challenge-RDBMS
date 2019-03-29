const router = require('express').Router()
const db = require('../data/dbConfig.js');

router.post('/', async (req, res) => {
  const action = {
    ...req.body, completed: req.body.completed || false
  }

  db('actions')
    .insert(action)
    .then(count => {
      res.status(201).json(count)
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('actions')
    .where({ id })
    .first()
    .then(action => {
      res.status(200).json({ ...action, completed: action.completed ? 'true' : 'false' });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('actions')
    .where({ id })
    .first()
    .del()
    .then(action => {
      if (action) {
        res.status(200).json({ message: 'Action deleted' });
      } else {
        res.status(404).json({ message: 'Action not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  db('actions')
    .where({ id })
    .update(req.body)
    .then(action => {
      if (action) {
        res.status(200).json({ message: 'Action updated' });
      } else {
        res.status(404).json({ message: 'Action not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
})




module.exports = router;