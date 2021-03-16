const router = require('express').Router();
const projectsDb = require('../data/helpers/projectModel');
const actionsDb = require('../data/helpers/actionModel');
const { verifyProjectId, verifyProjectBody, verifyActionBody } = require('../middleware');

router.get('/', async (req, res) => {
  try {
    const projects = await projectsDb.get();
    res.status(200).json(projects);
  } catch(err) {
    res.status(500).json({ error: "Cannot retrieve projects" })
  }
})

router.get('/:id', verifyProjectId, (req, res) => {
  res.status(200).json(req.project);
})

router.post('/', verifyProjectBody, async (req, res) => {
  try {
    const project = await projectsDb.insert(req.body);
    res.status(201).json(project);
  } catch(err) {
    res.status(500).json({ error: "Cannot add project" })
  }
})

router.put('/:id', verifyProjectId, verifyProjectBody, async (req, res) => {
  try {
    const project = await projectsDb.update(req.project.id, req.body);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: "Cannot update project" })
  }
})

router.delete('/:id', verifyProjectId, async (req, res) => {
  try {
    const project = await projectsDb.remove(req.project.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: "Cannot delete project" })
  }
})

router.get('/:id/actions', verifyProjectId, async (req, res) => {
  try {
    const actions = await projectsDb.getProjectActions(req.project.id);
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json({ error: "Cannot retrieve project actions" })
  }
})

router.post('/:id/actions', verifyProjectId, verifyActionBody, async (req, res) => {
  try {
    const action = await actionsDb.insert({...req.body, project_id: req.project.id});
    res.status(200).json(action);
  } catch (err) {
    res.status(500).json({ error: "Cannot post project action" })
  }
})

module.exports = router;