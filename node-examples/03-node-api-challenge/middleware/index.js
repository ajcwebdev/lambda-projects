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
      return res.status(404).json({ error: 'Could not find project with that id'});
    }

    req.project = project;

    next();
  } catch(err) {
    res.status(500).json({ error: "Couldnt retrieve project from database" })
  }
}

function verifyProjectBody(req, res, next) {
  const {name, description} = req.body;
  if(!name || !description) {
    return res.status(400).json({ error: "Please provide both a name and a description" });
  }

  next();
}

async function verifyActionId(req, res, next) {
  try {
    const action = await actionsDb.get(req.params.id);

    if (!action) {
      return res.status(404).json({ error: 'Could not find action with that id' });
    }

    req.action = action;

    next();
  } catch (err) {
    res.status(500).json({ error: "Couldnt retrieve action from database" })
  }
}

function verifyActionBody(req, res, next) {
  const { notes, description } = req.body;
  if (!description || !notes) {
    return res.status(400).json({ error: "Please provide notes and description" });
  }

  next();
}