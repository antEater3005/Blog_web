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
  await Posts.create(post);
  res.json(post);
});

// Get a specific post based on id

router.get('/post/:id', async (req, res) => {
  const post = await Posts.findByPk(req.params.id);
  res.json(post);
});

//  get the number of posts by a specific user

router.get('/user-posts', validateToken, async (req, res) => {
  const id = req.validToken.id;
  const numberOfPosts = await Posts.count({
    where: {
      id: id,
    },
  });
  res.json(numberOfPosts);
});

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
  if (reaction) {
    if (reaction.like == isLike) res.json({ error: 'Already reacted!' });
    else {
      await PostLikes.update(
        {
          like: isLike,
        },
        {
          where: {
            id: reaction.id,
          },
        }
      );
      if (isLike) {
        await Posts.update(
          {
            likes: likes + 1,
            dislikes: dislikes - 1,
          },
          {
            where: {
              id: reaction.id,
            },
          }
        );
      }
    }
  } else {
    const newReaction = {
      userId: userId,
      PostId: postId,
      like: isLike,
    };
    await PostLikes.create(newReaction);
  }
  res.json();
});

module.exports = router;
