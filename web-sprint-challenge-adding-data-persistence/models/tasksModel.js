const db = require('../data/dbConfig.js');

module.exports = {
  addTask,
  getTasks,
  updateTask,
  deleteTask
}

async function addTask(task) {
  return await db('tasks')
    .insert(task)
}

async function getTasks() {
  return await db('tasks')
    .join('projects', 'projects.id', '=', 'tasks.project_id')
    .select('tasks.id', 'tasks.description', 'tasks.notes', 'tasks.completed', 'tasks.project_id', 'projects.name as project_name', 'projects.description as project_description')
}

async function updateTask(task, id) {
  return await db('tasks')
    .where({ id })
    .update(task)
}

async function deleteTask(id) {
  return await db('tasks')
    .where({ id })
    .del()
}