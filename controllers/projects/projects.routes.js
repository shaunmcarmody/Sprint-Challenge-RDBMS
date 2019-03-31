const router = require('express').Router();
const db = require('./projects.models.js');

router.post('/', async (req, res) => {
  // required - name, completed
  if (!req.body.name) {
    return res.status(400).json({ message: 'Project name required' });
  }
  const project = { ...req.body, completed: req.body.completed || 0 }
  try {
    const id = await db.insertProject(project);
    const resource = await db.getProject(id[0]);
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const resource = await db.getProject(id);
    if (resource) {
      const actions = await db.getProjectActions(id);
      resource.actions = actions.map(action => ({
        ...action,
        completed: action.completed ? 'true' : 'false'
      }));
      res
        .status(200)
        .json({ ...resource, completed: resource.completed ? 'true' : 'false' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.deleteProject(id)
    if (result) {
      res.status(200).json({ message: 'Project deleted' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.updateProject(id, req.body)
    if (result) {
      const resource = await db.getProject(id);
      res
        .status(200)
        .json({ ...resource, completed: resource.completed ? 'true' : 'false' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;