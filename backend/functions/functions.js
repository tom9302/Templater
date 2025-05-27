const puppeteer = require("puppeteer-core")
const chromium = require("@sparticuz/chromium")
const fs = require("fs")
const path = require("path")

const {
    findStartingNode, getAllDescendantNodesIds, getAllDescendantNodesStyles, cleanStyles
} = require("./scrapingFunctions")

async function scrapeTemplate(url, selector, tag, id, classes){
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    })
    const page = await browser.newPage()

    console.log(url)

    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 10000 })
    await page.setViewport({ width: 1280, height: 720 })

    const sectionHtml = await page.$eval(selector, el => el.outerHTML)

    const cdp = await page.createCDPSession()
    await cdp.send("DOM.enable")
    await cdp.send("CSS.enable")

    const rootNode = await cdp.send("DOM.getDocument", {
        depth: -1
    })

    const bodyNode = rootNode.root.children[1].children[1]
    let startingNode = findStartingNode(bodyNode, tag, id, classes)
    let nodesIdsArray = []
    let nodesIds = getAllDescendantNodesIds(startingNode, nodesIdsArray)
    let allNodesStyles = await getAllDescendantNodesStyles(cdp, nodesIds)
    const sectionCss = cleanStyles(allNodesStyles, url)

    await browser.close();

    return { sectionHtml, sectionCss }
}

function copyReadWrite(html, css) {
    // copy "blank-file" and name the new file "template"
    fs.copyFile("blank-file.html", "template.html", (err) => {
        console.log(err)

        fs.readFile("template.html", 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            data = data.replace("<body>", "<body> \n \t " + html)
            data = data.replace("<style>", "<style> \n \t " + css)

            fs.writeFile("template.html", data, err => {
                if (err) {
                    console.error(err);
                }
            })
        })
    })
}

async function takeScreenshot(selector) {
    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
    const page = await browser.newPage();

    const templatePath = path.resolve("template.html")

    await page.goto(templatePath);
    await page.setViewport({ width: 1280, height: 720 });
    const element = await page.$(selector);
    const screenshot = await element.screenshot({ path: "template.jpg" })

    await browser.close();

    return screenshot
}

module.exports = { scrapeTemplate, copyReadWrite, takeScreenshot }