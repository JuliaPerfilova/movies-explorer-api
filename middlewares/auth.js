const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const { DEV_SECRET, MESSAGES } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET,
    );
  } catch (err) {
    next(new UnauthorizedError(MESSAGES.INVALID_TOKEN));
  }
  req.user = payload;

  next();
};
