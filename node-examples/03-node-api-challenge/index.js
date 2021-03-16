const express = require('express');
const cors = require('cors');
const projectRouter = require('./routers/project-router');
const actionRouter = require('./routers/actions-router');

const server = express();
const PORT = process.env.PORT || 5000


server.use(express.json());
server.use(cors());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.listen(PORT, () => {
  console.log("\n Server running on ${PORT} \n");
})