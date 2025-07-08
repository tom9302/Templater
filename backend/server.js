require("dotenv").config()
const express = require("express");
const cors = require("cors")

const routes = require("./routes")

const app = express();

app.get("/", async (req, res) => {
    res.send("API working")
})

const allowedOrigins = [
  'https://templater-liart.vercel.app/',
  'http://localhost:3000'
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))
app.use(express.json({ limit: "10mb" }))
app.use("/api", routes)

/* app.listen(process.env.PORT, () => {
    console.log(`Express app listening on port ${process.env.PORT}`)
}) */

module.exports = app