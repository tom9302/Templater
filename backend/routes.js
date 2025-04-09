const express = require("express")
const path = require("path")

const { scrapeTemplate } = require("./functions/puppeteerFunctions")
const { createTemplate } = require("./functions/fileSystemFunctions")

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
    const { url, tag, id, classText, selector, templateName, selectedCategory, newCategory } = req.body
    const { sectionHtml, sectionCss } = await scrapeTemplate(url, selector, tag, id, classText)
    createTemplate(templateName, selectedCategory, newCategory, sectionHtml, sectionCss)
    res.json({ url, selector, templateName, selectedCategory, newCategory })
})

module.exports = router