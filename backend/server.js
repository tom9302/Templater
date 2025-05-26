require("dotenv").config()
const express = require("express");
const cors = require("cors")

const routes = require("./routes")

const app = express();

app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use("/api", routes)

app.listen(process.env.PORT, () => {
    console.log(`Express app listening on port ${process.env.PORT}`)
})

module.exports = app