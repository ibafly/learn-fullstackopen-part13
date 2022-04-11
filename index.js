const { PORT } = require("./utils/config")
const { connectToDb } = require("./utils/db")
const blogsRouter = require("./controllers/blogs")

const express = require("express")
const app = express()

app.use(express.json()) // let strings in request parsed as js object automatically

app.use("/api/blogs", blogsRouter)

const start = async () => {
  await connectToDb()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
