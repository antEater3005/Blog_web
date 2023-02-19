const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.header('accessToken');
  const isLike = req.body.id;
  const postId = req.body.postId;
  if (!accessToken) return res.json({ error: 'Please login!' });
  try {
    const validToken = verify(accessToken, 'important_secret');
    req.validToken = validToken;
    req.isLike = isLike;
    req.postId = postId;
    if (validToken) return next();
  } catch {
    res.json({ error: 'error verifying' });
  }
};

module.exports = { validateToken };
