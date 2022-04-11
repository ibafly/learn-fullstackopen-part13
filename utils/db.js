const { DATABASE_URL } = require("./config")
const { Sequelize, QueryTypes, DataTypes, Model } = require("sequelize")

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

const connectToDb = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connected to the database")
    // sequelize.close()
  } catch (error) {
    console.error("Unable to connect to the database:", error)
    return process.exit(1)
  }

  return null
}

module.exports = { sequelize, connectToDb }
