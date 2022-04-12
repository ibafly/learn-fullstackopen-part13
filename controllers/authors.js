const router = require("express").Router()
const { sequelize } = require("../utils/db")
// const { Author } = require("../models")
const { Blog } = require("../models")

router.get("/", async (req, res) => {
  //   const authors = await Author.findAll({
  //     attributes: {order: [["likes", "DESC"]]},
  //   })

  const authors = await Blog.findAll({
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("author")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: ["author"],
  })

  res.status(200).send(authors)
})
//[
//   attributes: {
//     include: [[sequelize.fn("COUNT", sequelize.col("hats")), "n_hats"]]
//   }

// attributes
//  (sequelize.fn("SUM", sequelize.col("items.price")), "totalItemsWorth")
//],
//  [
//    sequelize.fn("COUNT", sequelize.fn("DISTINCT", sequelize.col("items.id"))),
//    "itemsCount",
//  ],

// group:['blog.author']
module.exports = router
