function IncorrectInputError() {
  this.name = 'IncorrectInputError';
  this.message = 'INCORRECT_INPUT';
}

IncorrectInputError.prototype = Error.prototype;

module.exports.IncorrectInputError = IncorrectInputError;
