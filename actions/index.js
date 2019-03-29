const router = require('express').Router()
const db = require('../data/dbConfig.js');

router.post('/', async (req, res) => {
  const action = {
    ...req.body, completed: req.body.completed || false
  }

  console.log(action);

  db('actions')
    .insert(action)
    .then(count => {
      res.status(201).json(count)
    })
    .catch(err => {
      res.status(500).json(err);
    });
})




module.exports = router;