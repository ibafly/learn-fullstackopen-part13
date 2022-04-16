const { Model, DataTypes } = require("sequelize")

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("sessions", {
      token: {
        type: DataTypes.UUID,
        primaryKey: true,
        //   unique: true,
        // allowNull: false,
      },
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sessions")
  },
}
