const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const { validateToken } = require('../middleWare/AuthMiddleWare');
const { Profile_Pictures } = require('../models');

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
      });
      if (image) Profile_Pictures.create({ image: image, userName: userName });
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
  const image = await Profile_Pictures.findOne({
    where: { userName: user.userName },
  });
  const data = {
    userName: user.userName,
    name: user.name,
    join_date: user.createdAt,
    image: image.image,
  };
  res.json(data);
});

module.exports = router;
