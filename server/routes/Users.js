const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const { validateToken } = require('../middleWare/AuthMiddleWare');
const { route } = require('./Comments');
const { where } = require('sequelize');

// register
router.post('/register', async (req, res) => {
  const { userName, Password, name, image, email } = req.body;
  const user = await Users.findOne({ where: { UserName: userName } });
  if (user) {
    res.json({ error: 'User already exist! Pls Login!' });
    return;
  }
  bcrypt
    .hash(Password, 10)
    .then((hash) => {
      Users.create({
        userName: userName,
        Password: hash,
        name: name,
        email: email,
        image: image,
      });
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
        { userName: user.userName, id: user.id, image: user.image },
        'important_secret'
      );
      res.json({
        message: 'You logged in successfully!',
        accessToken: accessToken,
        userName: userName,
        id: user.id,
      });
    })
    .catch(() => {});
});

// to validate token so dummy tokens cannot be used

router.get('/token-valid', validateToken, (req, res) => {
  res.json({ user: req.validToken });
});

// get user profile data

router.get('/user', validateToken, async (req, res) => {
  const id = req.validToken.id;
  const user = await Users.findOne({ where: { id: id } });
  const data = {
    userName: user.userName,
    name: user.name,
    join_date: user.createdAt,
    image: user.image,
  };
  res.json(data);
});

module.exports = router;
