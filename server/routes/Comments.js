const express = require('express');
const { validateToken } = require('../middleWare/AuthMiddleWare');
const router = express.Router();
const { Comments } = require('../models');

router.get('/:postID', async (req, res) => {
  const comment = await Comments.findAll({
    where: { PostId: req.params.postID },
  });
  res.json(comment);
});

router.post('/', validateToken, async (req, res) => {
  const comment = req.body;
  comment.userName = req.validToken.userName;
  await Comments.create(comment);
  res.json(comment);
});

module.exports = router;
