const Blog = require("./blog")
const User = require("./user")
const ReadingList = require("./readingList")

User.hasMany(Blog)
Blog.belongsTo(User)
// User.sync({ alter: true })
// Blog.sync({ alter: true })

User.belongsToMany(Blog, { through: ReadingList, as: "reading" })
Blog.belongsToMany(User, { through: ReadingList })

module.exports = { Blog, User }
