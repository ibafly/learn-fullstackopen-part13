const { Sequelize, QueryTypes, DataTypes, Model } = require("sequelize")
const { sequelize } = require("../utils/db")

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // ---no need to define at class level
    // ---use A.hasMany(B) B.belongsTo(A) achieves the same result
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: { model: "users", key: "id" },
    // },
  },
  {
    sequelize, // instance object created from database data
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
)

module.exports = { Blog }
