const router = require('express').Router();
const db = require('./actions.models.js');

router.post('/', async (req, res) => {
  // required - description, project_id & completed
  if (!req.body.description || !req.body.project_id) {
    return res.status(400).json({ message: 'Description & Project Id required' });
  }
  const action = { ...req.body, completed: req.body.completed || 0 }
  try {
    const id = await db.insertAction(action);
    const resource = await db.getAction(id[0]);
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resource = await db.getAction(id);
    if (resource) {
      res.status(200).json({
        ...resource, completed: resource.completed ? 'true' : 'false' });
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.deleteAction(id)
    if (result) {
      res.status(200).json({ message: 'Action deleted' });
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.updateAction(id, req.body)
    if (result) {
      const resource = await db.getAction(id);
      res
        .status(200)
        .json({ ...resource, completed: resource.completed ? 'true' : 'false' });
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;