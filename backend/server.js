const express = require("express");

const routes = require("./routes")

const app = express();

app.use(express.json())
app.use(express.static('public'))
app.use(routes)

app.listen(4000, () => {
    console.log(`Example app listening on port 4000`)
    require('child_process').exec("start http://localhost:4000/");
})

//scrapeTemplate("https://web.dev/blog", "div.devsite-card-wrapper", "div", "", "devsite-card-wrapper")