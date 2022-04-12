const router = require("express").Router()
const jwt = require("jsonwebtoken")
const { SECRET } = require("../utils/config")
const { User } = require("../models")

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

  const userInfo = { username, name: foundUser.name, id: foundUser.id }
  const token = await jwt.sign(userInfo, SECRET)

  res.status("200").send({ ...userInfo, token })
})

module.exports = router
