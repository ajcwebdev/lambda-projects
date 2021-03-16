const router = require('express').Router();

const usersDb = require('../models/user-models');

router.get('/', async (req, res) => {
  try {
    const users = await usersDb.find();
    res.status(200).json(users);
  } catch(err) {
    res.status(500).json({ error: "Database error" });
  }
})

module.exports = router;