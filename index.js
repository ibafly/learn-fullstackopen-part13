require("dotenv").config()
const { Sequelize, QueryTypes, DataTypes, Model } = require("sequelize")

const express = require("express")
const app = express()

app.use(express.json()) // let strings in request parsed as js object automatically

const PORT = process.env.PORT || 3001

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

// ---1---
// const main = async () => {
//   try {
//     await sequelize.authenticate()
//     console.log('Connection has been established successfully.')
//     const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })
// 	console.log(notes)
//     sequelize.close()
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// }

// main()

//---3
class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      default: 1,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog",
  }
)

Blog.sync()

app.get("/api/blogs", async (req, res) => {
  // ---2---
  // const notes = await sequelize.query("SELECT * FROM notes", { type: QueryTypes.SELECT })

  // ---3---
  const blogs = await Blog.findAll()

  return res.json(blogs)
})

app.post("/api/blogs", async (req, res) => {
  try {
    console.log(req)
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

app.delete("/api/blogs/:id", async (req, res) => {
  try {
    await Blog.destroy({ where: { id: req.params.id } })
    return res.status(204).end()
  } catch (error) {
    return res.status(400).json({ error })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
