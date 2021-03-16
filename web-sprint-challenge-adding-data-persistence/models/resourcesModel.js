const db = require('../data/dbConfig.js');

module.exports = {
  addResource,
  getResources,
  getProjectsByResource
}

async function addResource(resource) {
  return await db('resources')
    .insert(resource)
}

async function getResources() {
  return await db('resources');
}

async function getProjectsByResource(resource_id) {
  return await db('project_resources')
    .where({ resource_id })
    .join('projects', 'projects.id', '=', 'project_resources.project_id')
    .select('projects.id', 'projects.name', 'projects.description', 'projects.completed')
}