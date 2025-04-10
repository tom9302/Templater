require("dotenv").config()
const express = require("express");
const cors = require("cors")

const routes = require("./routes")

const app = express();

app.use(cors())
app.use(express.json())
//app.use(express.static('public'))
app.use(routes)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
    //require('child_process').exec("start http://localhost:4000/");
})

//scrapeTemplate("https://web.dev/blog", "div.devsite-card-wrapper", "div", "", "devsite-card-wrapper")