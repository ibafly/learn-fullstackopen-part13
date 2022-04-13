const router = require("express").Router()
const { sequelize } = require("../utils/db")
const { Blog } = require("../models")

router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: ["author"],
    order: [[sequelize.literal("likes"), "DESC"]], // or [[sequelize.fn("SUM", sequelize.col("likes")), "DESC"]]
  })

  if (!authors) {
    return res.status(500).send({ error: "bad query" })
  }

  res.status(200).send(authors)
})

module.exports = router
