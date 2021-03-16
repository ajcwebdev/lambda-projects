const db = require('../data/dbConfig.js');

module.exports = {
  addProject,
  getProjects,
  getProjectResources,
  addProjectResource,
  getProjectTasks
}

async function addProject(project) {
  return await db('projects')
    .insert(project)
}

async function getProjects() {
  return await db('projects');
}

async function getProjectResources(project_id) {
  return await db('project_resources')
    .where({ project_id })
    .join('resources', 'resources.id', '=', 'project_resources.resource_id')
    .select('resources.id', 'resources.name', 'resources.description' )
}

async function getProjectTasks(project_id) {
  return await db('tasks')
    .where({ project_id })
}

async function addProjectResource(resource_id, project_id) {
  return await db('project_resources')
    .insert({ resource_id, project_id });
}