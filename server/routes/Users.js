const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const { validateToken } = require('../middleWare/AuthMiddleWare');
const { route } = require('./Comments');

// register
router.post('/register', async (req, res) => {
  const { userName, Password } = req.body;
  const user = await Users.findOne({ where: { UserName: userName } });
  if (user) {
    res.json({ message: 'User already exists!' });
    return;
  }
  bcrypt
    .hash(Password, 10)
    .then((hash) => {
      Users.create({ userName: userName, Password: hash });
      res.json({ message: 'Registered successfully!' });
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
    res.json({ message: 'User not found!' });
    return;
  }
  bcrypt
    .compare(Password, user.Password)
    .then((match) => {
      if (!match) {
        res.json({ error: 'Password Incorrect!' });
      }

      const accessToken = sign(
        { userName: user.userName, id: user.id },
        'important_secret'
      );
      console.log(accessToken);
      res.json({
        message: 'You logged in successfully!',
        accessToken: accessToken,
      });
    })
    .catch(() => {});
});

// to validate token so dummy tokens cannot be used

router.get('/token-valid', validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
