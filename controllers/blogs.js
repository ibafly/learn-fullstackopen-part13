const router = require("express").Router() // MIND the ()!!
require("express-async-errors")
const { Blog, User } = require("../models")

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: {
      exclude: ["userId"], // hide userId in blog model
    },
    include: {
      model: User,
      attributes: ["name"],
    },
  })

  res.status(200).json(blogs)
})

router.post("/", async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: "not authorized" })
  }

  console.log(req.user.id)
  const blogObj = { ...req.body, userId: req.user.id }
  const addedBlog = await Blog.create(blogObj)
  // const addedBlog = await Blog.create({ ...req.body, userId: req.user.id })

  if (!addedBlog) {
    return res.status(400).json({ error: "failed to create a new blog" })
  }

  res.json(addedBlog)
})

router.get("/:id", blogFinder, async (req, res) => {
  try {
    res.json(req.blog)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", blogFinder, async (req, res) => {
  if (req.blog.userId !== req.user.id) {
    return res.status(403).send({
      error: "no permission to delete blogs not added by current user",
    })
  }

  try {
    // await Blog.destroy({ where: { id: req.params.id } })
    await req.blog.destroy()
    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.put("/:id", blogFinder, async (req, res) => {
  //  try {
  const updatedBlog = await req.blog.update({ likes: req.body.likes })

  if (!updatedBlog) {
    return res.status(400).json({ error: "failed to change likes of a blog" })
  }
  res.json(updatedBlog)
  //  } catch (error) {
  //    res.status(400).json({ error: "failed to change likes of a blog" + error })
  //  }
})

module.exports = router
