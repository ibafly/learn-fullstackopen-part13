const router = require("express").Router()
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require("uuid")
const { SECRET } = require("../utils/config")
const { User } = require("../models")
const Session = require("../models/session")

router.post("/", async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status("400").send({ error: "username or password missing" })
  }

  const foundUser = await User.findOne({
    where: { username: req.body.username },
  })

  if (!foundUser || req.body.password !== "secret") {
    return res.status("400").send({ error: "invalid username" })
  }
  console.log(foundUser)
  if (foundUser.disabled === true) {
    return res.status("403").send({ error: "not allowed to login" })
  }

  const userInfo = { username, name: foundUser.name, id: foundUser.id }
  const token = await jwt.sign(userInfo, SECRET, {
    expiresIn: "12h",
    jwtid: uuidv4(),
  })
  const decodedToken = await jwt.decode(token)

  await Session.create({ token: decodedToken.jti }) // add the id of token to session table, but not the token itself

  res.status("200").send({ ...userInfo, token })
})

module.exports = router
