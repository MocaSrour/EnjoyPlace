class RateError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "RateError";
    this.code = code;
  }
}

module.exports = { RateError };