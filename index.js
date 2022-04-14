const { PORT } = require("./utils/config")
const { connectToDb } = require("./utils/db")
const middleware = require("./utils/middleware")
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const authorsRouter = require("./controllers/authors")
const readingListRouter = require("./controllers/readingLists")

const express = require("express")
require("express-async-errors")
const app = express()

app.use(express.json()) // let strings in request parsed as js object automatically
app.use(middleware.tokenExtractor)

app.use("/api/blogs", middleware.userExtractor, blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/authors", authorsRouter)
app.use("/api/readinglists", readingListRouter)
app.use("/api/login", loginRouter)

app.use(middleware.errorHandler)

const start = async () => {
  await connectToDb()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
