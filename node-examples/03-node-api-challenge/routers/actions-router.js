const router = require('express').Router();
const actionsDb = require('../data/helpers/actionModel');
const { verifyActionId, verifyActionBody } = require('../middleware');

router.get('/', async (req, res) => {
  try {
    const actions = await actionsDb.get();
    res.status(200).json(actions);
  } catch {
    res.status(500).json({ error: "Couldn't get actions from database" })
  }
})

router.get('/:id', verifyActionId, (req, res) => {
  res.status(200).json(req.action);
})

router.post('/', verifyActionBody, async (req, res) => {
  try {
    const action = await actionsDb.insert(req.body);
    res.status(201).json(action);
  } catch(err) {
    res.status(500).json({ error: "Couldn't add action to database" })
  }
})

router.put('/:id', verifyActionId, verifyActionBody, async (req, res) => {
  try {
    const action = await actionsDb.update(req.action.id, req.body);
    res.status(200).json(action);
  } catch {
    res.status(500).json({ error: "Couldn't update action in database" })
  }
})

router.delete('/:id', verifyActionId, async (req, res) => {
  try {
    const action = await actionsDb.remove(req.action.id);
    res.status(200).json(action);
  } catch {
    res.status(500).json({ error: "Couldn't delete action from database" })
  }
})

module.exports = router;