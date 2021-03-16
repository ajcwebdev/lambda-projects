const bcryptjs = require('bcryptjs');
const router = require('express').Router();
const Users = require("../users/users-models.js");
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

router.post('/register', (req, res) => {
  const { username, password, department } = req.body;

  const hash = bcryptjs.hashSync(password, process.env.HASH_ROUNDS || 8);

  Users.add({ username, password: hash, department })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Couldnt add user to database" });
    })
})

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  Users.findBy({ username })
    .then(([user]) => {
      if(user && bcryptjs.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: `Welcome ${user.username}`, token })
      } else {
        res.status(401).json({ message: 'You shall not pass!' });
      }      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Couldnt find user in database" });
    })
})

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  }

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;