const jwt = require("jsonwebtoken")
const { SECRET } = require("./config")
const logger = require("./logger")
const { Session } = require("../models")

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization")
  const token =
    authorization && authorization.toLowerCase().startsWith("bearer ")
      ? authorization.slice(7)
      : null

  req.token = token

  next()
}

const userExtractor = async (req, res, next) => {
  const userInfo = req.token ? jwt.verify(req.token, SECRET) : null

  if (!userInfo) {
    res.status("401").send({ error: "invalid token" })
  }

  // check session
  const foundSession = await Session.findByPk(userInfo.jti)
  console.log(userInfo.jti)

  if (!foundSession) {
    return res.status(401).send({ error: "expired token, session outdated" })
  }

  req.user = userInfo
  console.log(req.token, " ", req.user)

  next()
}

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
  tokenExtractor,
  userExtractor,
  //   unknownEndpoint,
  errorHandler,
}
