const express = require("express")
const path = require("path")

const { scrapeTemplate, copyReadWrite, takeScreenshot } = require("./functions/functions")

const router = express.Router()

router.get("/test", async (req, res) => {
    res.json({ message: "fetch successful" })
})

router.post("/scrape", async (req, res) => {
    const { url, tag, id, classText, selector } = req.body

    try {
        const { sectionHtml, sectionCss } = await scrapeTemplate(url, selector, tag, id, classText)
        copyReadWrite(sectionHtml, sectionCss)
        const screenshot = await takeScreenshot(selector)

        res.status(200).json({ sectionHtml, sectionCss, screenshot })
    } catch(e) {
        res.status(400).json({ error: e.message, url })
    }
})

router.get("/template", (req, res) => {
    res.sendFile(path.join(__dirname, "template.html"))
})

router.get("/download", (req, res) => {
    const filePath = __dirname + "\\template.html"

    res.download(filePath, (err) => {
        if (err) {
            console.error('File download failed:', err)
        } else {
            console.log('File downloaded successfully.')
        }
    })
})

module.exports = router