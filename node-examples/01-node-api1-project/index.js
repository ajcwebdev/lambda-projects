const express = require('express');
const sid = require('shortid');
const cors = require('cors');

const PORT = process.env.PORT || 8910;

const server = express();

server.use(express.json());
server.use(cors());

let users = [{
  id: sid.generate(),
  name: "John",
  bio: "Guitar"
}, {
  id: sid.generate(),
  name: "Ringo",
  bio: "Drums"
}];

server.get('/api/users', (req, res) => {
  try {
    res.status(200).json(users);
  } catch(err) {
    res.status(500).json({ errorMessage: "The users information could not be retrieved." });
  }
})

server.get(`/api/users/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await users.find(user => user.id == id);
    if (!user) {
      return res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    res.status(200).json(user);
  } catch(err) {
    res.status(500).json({ errorMessage: "The user information could not be retrieved." })
  }
})

server.post('/api/users', async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (!name || !bio) {
      return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }

    const id = sid.generate();
    users.push({ id, name, bio });

    const newUser = await users.find(user => user.name === name && user.bio === bio && user.id === id);
    res.status(201).json(newUser);
  } catch(err) {
    res.status(500).json({ errorMessage: "There was an error while saving the user to the database" });
  }
})

server.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userToDelete = await users.find(user => user.id == id);

    if (!userToDelete) {
      return res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
    users = users.filter(user => user.id != id);
    res.status(200).json(userToDelete);
  } catch(err) {
    res.status(500).json({ errorMessage: "The user could not be removed" });
  }
})

server.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio } = req.body;
    const user = await users.find(user => user.id == id);

    if (!user) {
      return res.status(404).json({ message: "The user with the specified ID does not exist." });
    }

    if (!name || !bio) {
      return res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
    }

    user.name = name;
    user.bio = bio;

    const updatedUser = users.find(user => user.name === name && user.bio === bio && user.id === id);

    res.status(200).json(updatedUser);
  } catch(err) {
    res.status(500).json({ errorMessage: "The user information could not be modified." });
  }
})

server.listen(PORT, () => {
  console.log(`\n Listening on localhost:${PORT} \n`);
})