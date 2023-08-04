const express = require('express');
const { validateToken } = require('../middleWare/AuthMiddleWare');
const { ReactionCheck } = require('../middleWare/ReactionMiddleWare');
const router = express.Router();
const { Posts } = require('../models');
const { PostLikes } = require('../models');

//Get all posts

router.get('/', async (req, res) => {
  const listOfPosts = await Posts.findAll();
  res.json(listOfPosts);
});

// Create post
router.post('/', validateToken, async (req, res) => {
  const post = req.body;
  post.author = req.validToken.userName;
  post.likes = 0;
  post.dislikes = 0;
  post.UserId = req.validToken.id;
  await Posts.create(post);
  res.json(post);
});

// Get a specific post based on id

router.get('/post/:id', async (req, res) => {
  const post = await Posts.findByPk(req.params.id);
  res.json(post);
});

//  get the number of posts by a specific user

// router.get('/user-posts', async (req, res) => {
//   const { id } = req.params;
//   const numberOfPosts = await Posts.count({
//     where: {
//       UserId: id,
//     },
//   });
//   res.json(numberOfPosts);
// });

// Reaction on post

router.post('/likes', validateToken, async (req, res) => {
  const postId = req.body.postId;
  const userId = req.validToken.id;
  const isLike = req.body.isLike;
  const reaction = await PostLikes.findOne({
    where: {
      userId: userId,
      PostId: postId,
    },
  });

  const post = await Posts.findOne({
    where: {
      id: postId,
    },
  });

  if (reaction) {
    if (reaction.like == isLike)
      return res.json({ error: 'You have already reacted!' });
    else {
      reaction.like = !reaction.like;
      await reaction.save();

      if (isLike) {
        post.dislikes = post.dislikes - 1;
        await post.save();
        post.likes = post.likes + 1;
        await post.save();
      } else {
        post.dislikes = post.dislikes + 1;
        await post.save();
        post.likes = post.likes - 1;
        await post.save();
      }
    }
  } else {
    const newReaction = {
      userId: userId,
      PostId: postId,
      like: isLike,
    };
    await PostLikes.create(newReaction);
    if (isLike) {
      post.likes = post.likes + 1;
      await post.save();
    } else {
      post.dislikes = post.dislikes + 1;
      await post.save();
    }
  }
  res.json(post);
});

// send back reaction

router.get('/reaction/:id', validateToken, async (req, res) => {
  const postId = req.params.id;
  const userId = req.validToken.id;
  const reaction = await PostLikes.findOne({
    where: {
      PostId: postId,
      userId: userId,
    },
  });
  if (reaction) return res.json(reaction);
  // return res.json({ error: 'Reaction does not exist!' });
});

// delete Post
router.delete('/post/:id', validateToken, async (req, res) => {
  const id = req.params.id;
  await Posts.destroy({
    where: { id: id },
  });
  res.json('Deleted');
});

module.exports = router;
