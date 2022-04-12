const { Sequelize, QueryTypes, DataTypes, Model } = require("sequelize")
const { sequelize } = require("../utils/db")

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // instance object created from database data
    underscored: true,
    timestamps: true,
    modelName: "user",
  }
)

module.exports = User
