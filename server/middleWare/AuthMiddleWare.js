const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
  const accessToken = req.header('accessToken');
  if (!accessToken) return res.json({ error: 'Please login!' });
  try {
    const validToken = verify(accessToken, 'important_secret');
    req.validToken=validToken;
    if (validToken) return next();
  } catch {
    res.json({ error: 'error verifying' });
  }
};

module.exports = { validateToken };
