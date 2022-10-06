const { ERROR_CODES, MESSAGES } = require('../constants');

class NotFoundError extends Error {
  constructor(message = MESSAGES.NOT_FOUND) {
    super(message);
    this.statusCode = ERROR_CODES.NOT_FOUND;
  }
}

module.exports = NotFoundError;
