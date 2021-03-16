const router = require('express').Router();
const db = require('../models/tasksModel.js');

router.get('/', async (req, res) => {

  try {
    const tasks = await db.getTasks();
    res.status(200).json(tasks);
  }
  
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot retrieve tasks" })
  }

})

router.post('/', async (req, res) => {

  try {
    const task = req.body;
    const taskId = await db.addTask(task);
    res.status(201).json(taskId);
  }
  
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot add task" })
  }

})

router.put('/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const updated = await db.updateTask(req.body, id);
    res.status(200).json(updated);
  }
  
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot update task" })
  }

})

router.delete('/:id', async (req, res) => {

  try {
    const { id } = req.params;
    const deleted = await db.deleteTask(id);
    res.status(200).json(deleted);
  }
  
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Cannot delete task" })
  }

})

module.exports = router;