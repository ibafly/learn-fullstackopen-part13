const router = require("express").Router()
const { User, Session } = require("../models")
// const Session = require("../models/session")

router.delete("/", async (req, res) => {
  const removedSession = await Session.destroy({
    where: { token: req.user.jti },
  }) // jti is the id of the token

  if (!removedSession) {
    return res.status(400).send({ error: "failed to remove session" })
  }

  res.status(204).end()
})

module.exports = router
