const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
// register
router.post('/register', async (req, res) => {
  const { userName, Password } = req.body;
  const user = await Users.findOne({ where: { UserName: userName } });
  if (user) {
    res.json({ message: 'User already exists' });
    return;
  }
  bcrypt
    .hash(Password, 10)
    .then((hash) => {
      Users.create({ userName: userName, Password: hash });
      res.json({ message: 'Registered successfully' });
    })
    .catch((error) => {
      res.json(error);
    });
});

// login route
router.post('/login', async (req, res) => {
  const { userName, Password } = req.body;

  const user = await Users.findOne({ where: { userName: userName } });

  if (!user) {
    res.json({ message: 'User not found' });
    return;
  }
  bcrypt
    .compare(Password, user.Password)
    .then((match) => {
      if (!match) {
        res.json({ message: 'Password mismatch' });
      }
      console.log('login successful');
      res.json({ message: 'You logged in successfully' });
    })
    .catch(() => {});
});

module.exports = router;
