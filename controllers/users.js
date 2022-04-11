const router = require("express").Router()
const { User } = require("../models")
const { all } = require("./blogs")

router.post("/", async (req, res) => {
  const newUser = await User.create(req.body)

  if (!newUser) {
    return res.status("400").send({ error: "failed to create a new user" })
  }

  res.status("201").send(newUser)
})

router.get("/", async (req, res) => {
  const allUsers = await User.findAll()

  if (!allUsers) {
    return res.status("400").send({ error: "failed to list all users" })
  }

  res.json(allUsers)
})

router.put("/:username", async (req, res) => {
  const foundUser = await User.findOne({
    where: { username: req.params.username },
  })

  if (!foundUser) {
    return res.status("404").send({ error: "not found this username" })
  }

  const updatedUser = await foundUser.update({ username: req.body.username })

  if (!updatedUser) {
    return res.status("400").send({ error: "failed to change username" })
  }

  res.json(updatedUser)
})

module.exports = router
