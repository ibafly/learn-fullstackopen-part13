const router = require("express").Router()
const ReadingList = require("../models/readingList")
const User = require("../models/user")
const Blog = require("../models/blog")

router.post("/", async (req, res) => {
  const { userId, blogId } = req.body

  if (!userId || !blogId) {
    return res.status(400).send({ error: "user or blog not provided" })
  }

  const foundUser = User.findByPk(userId)
  const foundBlog = Blog.findByPk(blogId)

  if (!foundUser || !foundBlog) {
    return res.status(400).send({ error: "user or blog not exist" })
  }

  const newUnread = await ReadingList.create({ userId, blogId })

  res.json(newUnread)
})

router.put("/:id", async (req, res) => {
  const foundReadingList = await ReadingList.findByPk(req.params.id)
  const updatedReadingList = await foundReadingList.update({
    read: req.body.read,
  })

  if (!updatedReadingList) {
    res.status(500).send({ error: "failed to change read status" })
  }

  res.send(updatedReadingList)
})

module.exports = router
