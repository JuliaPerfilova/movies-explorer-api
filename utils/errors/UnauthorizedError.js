const { ERROR_CODES, MESSAGES } = require('../constants');

class UnauthorizedError extends Error {
  constructor(message = MESSAGES.UNAUTHORIZED) {
    super(message);
    this.statusCode = ERROR_CODES.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
