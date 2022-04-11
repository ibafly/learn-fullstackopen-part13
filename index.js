const { PORT } = require("./utils/config")
const { connectToDb } = require("./utils/db")
const middleware = require("./utils/middleware")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")

const express = require("express")
require("express-async-errors")
const app = express()

app.use(express.json()) // let strings in request parsed as js object automatically

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)

app.use(middleware.errorHandler)

const start = async () => {
  await connectToDb()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
