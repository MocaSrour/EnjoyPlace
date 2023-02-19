function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.code).json(err.message);
}
module.exports = errorHandler;