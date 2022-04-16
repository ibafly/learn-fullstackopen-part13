const Blog = require("./blog")
const User = require("./user")
const ReadingList = require("./readingList")
const Session = require("./session")

User.hasMany(Blog)
Blog.belongsTo(User)
// User.sync({ alter: true })
// Blog.sync({ alter: true })

User.belongsToMany(Blog, { through: ReadingList, as: "readings" })
Blog.belongsToMany(User, { through: ReadingList })

module.exports = { Blog, User, ReadingList, Session }

// ReadingList can be defined aslo in this way, no need to import a seperate file like ./readingList
// const User_Profile = sequelize.define("User_Profile", {}, { timestamps: false })
// User.belongsToMany(Profile, { through: User_Profile })
// Profile.belongsToMany(User, { through: User_Profile })

// You probably noticed that the User_Profiles table does not have an id field. As mentioned above, it has a composite unique key instead. The name of this composite unique key is chosen automatically by Sequelize but can be customized with the uniqueKey option:

// User.belongsToMany(Profile, { through: User_Profiles, uniqueKey: 'my_custom_unique' });
