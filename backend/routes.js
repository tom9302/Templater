const express = require("express")
const path = require("path")

const { scrapeTemplate, takeScreenshot } = require("./functions/puppeteerFunctions")
const { createTemplate, copyReadWrite } = require("./functions/fileSystemFunctions")

const router = express.Router()

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
})

router.get("/data", (req, res) => {
    res.sendFile(path.join(__dirname, "data.json"));
})

router.get("/data2", (req, res) => {
    res.sendFile(path.join(__dirname, "data2.json"));
})

router.get("/templates/hero-sections/hero-section-digital.html", (req, res) => {
    res.sendFile(path.join(__dirname, "templates", "hero-sections", "hero-section-digital.html"));
})

router.get("/templates/:folder/:file", (req, res) => {
    res.sendFile(path.join(__dirname, "templates", req.params.folder, req.params.file));
})

router.post("/create", (req, res) => {
    const { templateName, selectedCategory, newCategory, html, css } = req.body
    createTemplate(templateName, selectedCategory, newCategory, html, css)
    res.json({ templateName, selectedCategory, newCategory, html, css })
})

router.post("/scrape", async (req, res) => {
    const { url, tag, id, classText, selector } = req.body
    const { sectionHtml, sectionCss } = await scrapeTemplate(url, selector, tag, id, classText)
    copyReadWrite(sectionHtml, sectionCss)
    const screenshotBase64 = await takeScreenshot()
    //const templatePath = path.resolve("template.jpg")
    //createTemplate(sectionHtml, sectionCss)
    //res.sendFile(templatePath)
    res.json({ sectionHtml, sectionCss, screenshotBase64 })
    // https://courses.webdevsimplified.com/
    // sc-dVBluf htlnUh
    // section
})

router.get("/template", (req, res) => {
    res.sendFile(path.join(__dirname, "template.html"));
})

module.exports = router