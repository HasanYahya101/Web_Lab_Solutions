import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import characterRoutes from './routes/characterRoutes.js'
import gadgetRoutes  from './routes/gadgetRoutes.js'

dotenv.config()

if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined in environment variables")
  process.exit(1)
}

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err))

app.use("/character", characterRoutes)
app.use("/gadgets", gadgetRoutes)

app.get("/", (req, res) => {
  res.send("Welcome to Doraemon Gadget Lab API")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
