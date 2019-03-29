const router = require('express').Router()
const db = require('../data/dbConfig.js');

router.post('/', async (req, res) => {
  const action = {
    ...req.body, completed: req.body.completed || false
  }

  console.log(action);

  try {
    const resource = await db('actions').insert(action);
    console.log(resource);
  } catch(err) {
    res.status(500).json(err);
  }
})




module.exports = router;