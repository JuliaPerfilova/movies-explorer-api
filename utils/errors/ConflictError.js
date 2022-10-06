const { ERROR_CODES, MESSAGES } = require('../constants');

class ConflictError extends Error {
  constructor(message = MESSAGES.CONFLICT) {
    super(message);
    this.statusCode = ERROR_CODES.CONFLICT;
  }
}

module.exports = ConflictError;
