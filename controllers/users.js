const router = require("express").Router()
const { User, Blog } = require("../models")

router.post("/", async (req, res) => {
  const newUser = await User.create(req.body)

  if (!newUser) {
    return res.status("400").send({ error: "failed to create a new user" })
  }

  res.status("201").send(newUser)
})

router.get("/", async (req, res) => {
  const allUsers = await User.findAll({
    attributes: {
      exclude: ["blogIds"],
    },
    include: {
      model: Blog,
      attributes: ["title"],
    },
  })

  if (!allUsers) {
    return res.status("400").send({ error: "failed to list all users" })
  }

  res.json(allUsers)
})

router.get("/:id", async (req, res) => {
  const foundUser = await User.findOne({
    where: { id: req.params.id },
    attributes: {
      exclude: ["id", "blogIds", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Blog,
        attributes: ["title"],
      },
      {
        model: Blog,
        as: "reading",
        attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
        through: {
          attributes: ["read", "id"],
        },
      },
    ],
  })

  if (!foundUser) {
    return res.status(404).send({ error: "not found user" })
  }

  res.send(foundUser)
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
