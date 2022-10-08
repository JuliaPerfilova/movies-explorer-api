const { ERROR_CODES, MESSAGES } = require('../constants');

class BadRequestError extends Error {
  constructor(message = MESSAGES.BAD_REQUEST) {
    super(message);
    this.statusCode = ERROR_CODES.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
