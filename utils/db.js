const { DATABASE_URL } = require("./config")
const { Sequelize, QueryTypes, DataTypes, Model } = require("sequelize")
const { Umzug, SequelizeStorage } = require("umzug")

const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: "migrations/*.js",
    },
    storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })
  const migrations = await migrator.up()
  // const migrations = await migrator.down()

  console.log("Migrations up to date", {
    files: migrations.map(mig => mig.name),
  })
}
const connectToDb = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log("Connected to the database")
    // sequelize.close()
  } catch (error) {
    console.error("Unable to connect to the database:", error)
    return process.exit(1)
  }

  return null
}

module.exports = { sequelize, connectToDb }
