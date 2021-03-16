const projectsDb = require('../data/helpers/projectModel');
const actionsDb = require('../data/helpers/actionModel');

module.exports = {
  verifyProjectId,
  verifyProjectBody,
  verifyActionId,
  verifyActionBody
}

async function verifyProjectId(req, res, next) {
  try {
    const project = await projectsDb.get(req.params.id);
    if(!project) {
      return res.status(404).json({ error: 'Cannot find project'});
    }
    req.project = project;
    next();
  } catch(err) {
    res.status(500).json({ error: "Cannot retrieve project" })
  }
}

function verifyProjectBody(req, res, next) {
  const {name, description} = req.body;
  if(!name || !description) {
    return res.status(400).json({ error: "Please provide name and description" });
  }
  next();
}

async function verifyActionId(req, res, next) {
  try {
    const action = await actionsDb.get(req.params.id);
    if (!action) {
      return res.status(404).json({ error: 'Cannot find action' });
    }
    req.action = action;
    next();
  } catch (err) {
    res.status(500).json({ error: "Cannot retrieve action" })
  }
}

function verifyActionBody(req, res, next) {
  const { notes, description } = req.body;
  if (!description || !notes) {
    return res.status(400).json({ error: "Please provide notes and description" });
  }
  next();
}