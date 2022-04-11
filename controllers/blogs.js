const router = require("express").Router() // MIND the ()!!
const { Blog } = require("../models")

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll()

  res.json(blogs)
})

router.post("/", async (req, res) => {
  try {
    console.log(req)
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.delete("/:id", blogFinder, async (req, res) => {
  try {
    // await Blog.destroy({ where: { id: req.params.id } })
    await req.blog.destroy()
    res.status(204).end()
  } catch (error) {
    res.status(400).json({ error })
  }
})

module.exports = router
