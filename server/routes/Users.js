const express = require('express');
const router = express.Router();
const { Users, Posts } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const { validateToken } = require('../middleWare/AuthMiddleWare');

// register
router.post('/register', async (req, res) => {
  const { data, image } = req.body;
  const { userName, Password, name, email } = data;
  // console.log(image);
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
      res.json({ error: 'error' });
    });
});

// login route
router.post('/login', async (req, res) => {
  const { userName, Password } = req.body;

  const user = await Users.findOne({ where: { userName: userName } });

  if (!user) {
    res.json({ ErrorMessage: 'User not found!' });
    return;
  }
  bcrypt
    .compare(Password, user.Password)
    .then((match) => {
      if (!match) {
        res.json({ ErrorMessage: 'Password Incorrect!' });
        return;
      }

      const accessToken = sign(
        { userName: user.userName, id: user.id },
        'important_secret'
      );
      res.json({
        message: 'You logged in successfully!',
        accessToken: accessToken,
        userName: userName,
        image: user.image,
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

router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await Users.findOne({ where: { id: userId } });
  const numberOfPosts = await Posts.count({
    where: {
      UserId: userId,
    },
  });
  const data = {
    userName: user.userName,
    name: user.name,
    join_date: user.createdAt,
    image: user.image,
    numberOfPosts: numberOfPosts,
  };
  res.json(data);
});

module.exports = router;
