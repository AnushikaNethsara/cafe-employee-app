const logger = require('../logger/logging');

function errorMiddleware(err, req, res, next) {
  logger.error(err.stack);
  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Internal Server Error';
  const errorObject = {
    error: {
      message: errorMessage,
      code: statusCode
    }
  };
  res.status(statusCode).json(errorObject);
}

module.exports = errorMiddleware;
