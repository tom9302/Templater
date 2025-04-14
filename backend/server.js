require("dotenv").config()
const express = require("express");
const cors = require("cors")

const routes = require("./routes")

const app = express();

app.use(cors())
app.use(express.json({ limit: "10mb" }))
app.use(routes)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})

// https://courses.webdevsimplified.com/
// section
// sc-dVBluf htlnUh