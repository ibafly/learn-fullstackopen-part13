const { Model, DataTypes } = require("sequelize")
const { sequelize } = require("../utils/db")

class Session extends Model {}
Session.init(
  {
    token: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "session",
  }
)

module.exports = Session
