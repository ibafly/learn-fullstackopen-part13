const router = require("express").Router()
const bcrypt = require("bcrypt")
const { User, Blog, ReadingList } = require("../models")

router.post("/", async (req, res) => {
  const { name, username, password } = req.body

  const foundUser = await User.findOne({
    where: { username },
  })

  if (foundUser) {
    return res.status("400").send({ error: "username already been taken" })
  }

  const passwordHash = await bcrypt.hash(password, 10) // salt rounds is 10
  const newUser = await User.create({ name, username, passwordHash })

  if (!newUser) {
    return res.status("400").send({ error: "failed to create a new user" })
  }

  res.status("201").send({ username, name })
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
  let where = {}

  if (req.query.read) {
    where.read = req.query.read // way#1
    // way#2: anothor way to filter /api/users/:id?read=<boolean>
    // see nested attribute: https://sequelize.org/api/v7/index.html#WhereAttributeHash. Remember to put 'where' in the parent* object.
    //
    // where["$readings.readingList.user_id$"] = req.params.id
    // where["$readings.readingList.read$"] = req.query.read
  }

  const foundUser = await User.findOne({
    where: {
      id: req.params.id,
      // ...where, // way#2 in parent* object
    },
    attributes: {
      exclude: ["id", "blogIds", "createdAt", "updatedAt"],
    }, // or simply written as `attributes: ['name','username']`
    include: [
      {
        model: Blog, // blogs one user added
        attributes: ["title"],
      },
      {
        model: Blog, // blogs one user marked read status
        as: "readings",
        attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
        through: {
          attributes: ["read", "id"],
          where, // way#1: put 'where' here when not using nested attribute querying
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
