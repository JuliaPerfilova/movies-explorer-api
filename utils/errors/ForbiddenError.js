const { ERROR_CODES, MESSAGES } = require('../constants');

class ForbiddenError extends Error {
  constructor(message = MESSAGES.FORBIDDEN) {
    super(message);
    this.statusCode = ERROR_CODES.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
