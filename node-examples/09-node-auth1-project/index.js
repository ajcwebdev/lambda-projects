const express = require('express');
const session = require('express-session');
const authRouter = require('./auth/authRouter');
const userRouter = require('./routes/user-routes');
const protected = require('./auth/protected');

const server = express();

server.use(express.json());

server.use(
  session({
    name: 'notsession',
    secret: 'super-duper-secret',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false,
      httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
  })
)

server.use('/api/users', protected, userRouter);
server.use('/api/auth', authRouter);

server.listen(5000, () => {
  console.log('\n Server running on 5000 \n');
})