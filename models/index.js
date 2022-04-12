// const { Blog, Author } = require("./blog")
const { Blog } = require("./blog")
const User = require("./user")

User.hasMany(Blog)
Blog.belongsTo(User)
// Blog.hasOne(Author)
User.sync({ alter: true })
Blog.sync({ alter: true })
// Author.sync({ alter: true })

// module.exports = { Blog, User, Author }
module.exports = { Blog, User }
