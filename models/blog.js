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
    timestamps: true, // IMPORTANT: if is set to false, then timestamps (created time & updated time) will not be bumped into DB under their columns, even you add created_at & updated_at in migration file!!
    // QUESTION: does that mean models here will override table definitions in migration file?
    modelName: "blog",
  }
)

module.exports = Blog
