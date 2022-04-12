const logger = require("./logger")

const errorHandler = (error, request, response, next) => {
  // custom error handler
  logger.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" })
  } else if (error.name === "SequelizeDatabaseError") {
    return response.status(400).json({ error: error.message })
  } else if (error.name === "SequelizeValidationError") {
    return response
      .status(400)
      .json({ error: error.errors.map(err => err.message) })
  }

  next(error) // default error handler
}

module.exports = {
  //   requestLogger,
  //   tokenExtractor,
  //   userExtractor,
  //   unknownEndpoint,
  errorHandler,
}
