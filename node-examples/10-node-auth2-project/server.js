const express = require('express');

const server = express();
const authRouter = require('./auth/authRouter.js');
const usersRouter = require('./users/users-router.js');
const isAuth = require('./auth/isAuth.js');

server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/users', isAuth, usersRouter);

module.exports = server;