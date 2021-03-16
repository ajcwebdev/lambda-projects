const router = require('express').Router();
const actionsDb = require('../data/helpers/actionModel');
const { verifyActionId, verifyActionBody } = require('../middleware');

router.get('/', async (req, res) => {
  try {
    const actions = await actionsDb.get();
    res.status(200).json(actions);
  } catch {
    res.status(500).json({ error: "Cannot get actions" })
  }
})

router.get('/:id', verifyActionId, (req, res) => {
  res.status(200).json(req.action);
})

router.put('/:id', verifyActionId, verifyActionBody, async (req, res) => {
  try {
    const action = await actionsDb.update(req.action.id, req.body);
    res.status(200).json(action);
  } catch {
    res.status(500).json({ error: "Cannot update action" })
  }
})

router.delete('/:id', verifyActionId, async (req, res) => {
  try {
    const action = await actionsDb.remove(req.action.id);
    res.status(200).json(action);
  } catch {
    res.status(500).json({ error: "Cannot delete action" })
  }
})

module.exports = router;