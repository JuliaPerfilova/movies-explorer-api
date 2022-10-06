const { ERROR_CODES, MESSAGES } = require('../constants');

class InternalServerError extends Error {
  constructor(message = MESSAGES.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = ERROR_CODES.INTERNAL_SERVER_ERROR;
  }
}

module.exports = InternalServerError;
