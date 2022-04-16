const { Model, DataTypes } = require("sequelize")
const sequelize = require("../utils/db")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn("users", "disabled", {
      type: DataTypes.BOOLEAN,
      default: false, // set default for BOOLEAN type, defaultValue for INTEGER/STRING/TEXT types
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "disabled")
  },
}
