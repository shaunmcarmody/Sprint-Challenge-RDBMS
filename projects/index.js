const router = require('express').Router()
const db = require('../data/dbConfig.js');

router.post('/', async (req, res) => {
  const project = {
    ...req.body, completed: req.body.completed || false
  }

  console.log(project);

  try {
    const resource = await db('projects').insert(project);
    console.log(resource);
  } catch(err) {
    res.status(500).json(err);
  }
})



module.exports = router;