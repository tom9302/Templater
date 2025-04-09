const puppeteer = require("puppeteer")
const fs = require("fs")

const {
    findStartingNode, getAllDescendantNodesIds, getAllDescendantNodesStyles, cleanStyles
} = require("./scrapingFunctions")

const data2 = require("../data2.json")

async function readHTMLwriteJSON(url, category, template, fileName, templateImagePath, navbarPreviewPath){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    const html = await page.$eval('body', el => el.innerHTML);
    const css = await page.$eval('style', el => el.innerHTML);
    const bodySection = await page.$("body");
    
    /* let data2 = {

    } */

    if(category == "navbars"){
        await page.setViewport({ width: 580, height: 300 })
        await bodySection.screenshot({ path: templateImagePath })

        await page.setViewport({ width: 1280, height: 720 });

        const navWidth = await page.$eval("nav", el => getComputedStyle(el).getPropertyValue("width"))
        const navHeight = await page.$eval("nav", el => getComputedStyle(el).getPropertyValue("height"))

        await page.setViewport({ 
            width: parseInt(navWidth.slice(0, navWidth.length - 2)),
            height: parseInt(navHeight.slice(0, navHeight.length - 2))
        });
    
        await bodySection.screenshot({ path: navbarPreviewPath });

        await browser.close();

        

        

        data2[category][template] = {
            html: html,
            css: css,
            path: url,
            name: fileName,
            image: templateImagePath,
            preview: navbarPreviewPath,
            previewWidth: navWidth,
            previewHeight: navHeight
        }
    }
    else{
        await page.setViewport({ width: 1280, height: 720 });
        await bodySection.screenshot({ path: templateImagePath })

        await browser.close();

        /* let templateObject = {
            [template]: {
                html: html,
                css: css,
                path: url,
                name: fileName,
                image: templateImagePath
            }
        } */

        if(data2.hasOwnProperty(category)){
            Object.assign(data2[category], {
                [template]: {
                    html: html,
                    css: css,
                    path: url,
                    name: fileName,
                    image: templateImagePath
                },
            })
            console.log("category already exists")
        }
        else{
            Object.assign(data2, {
                [category]: {
                    [template]: {
                        html: html,
                        css: css,
                        path: url,
                        name: fileName,
                        image: templateImagePath
                    },
                },
            })
            console.log("new category created")
        }

        

        /* data2[category][template] = {
            html: html,
            css: css,
            path: url,
            name: fileName,
            image: templateImagePath
        } */
    }
    

    //fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    fs.writeFileSync("data2.json", JSON.stringify(data2, null, 2));
}

async function scrapeTemplate(url, selector, tag, id, classes){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    //console.log(selector, tag, classes)

    //await page.goto("https://courses.webdevsimplified.com/")
    await page.goto(url)
    await page.setViewport({ width: 1280, height: 720 })

    //const sectionHtml = await page.$eval("section.sc-elDIKY.dqzdoE", el => el.outerHTML)
    const sectionHtml = await page.$eval(selector, el => el.outerHTML)

    const cdp = await page.createCDPSession()
    await cdp.send("DOM.enable")
    await cdp.send("CSS.enable")

    /* await page.waitForSelector('section#homeHeroBanner');
    const element = await page.$('section#homeHeroBanner'); */

    const rootNode = await cdp.send("DOM.getDocument", {
        depth: -1
    })

    //const myNode = findStartingNode(rootNode.root.children[1].children[1])
    //console.log(rootNode.root.children[1].children[1])

    //const myNode = rootNode.root.children[1].children[1].children[0].children[0].children[0].children[0]
    const bodyNode = rootNode.root.children[1].children[1]
    //var xx = []
    let startingNode = findStartingNode(bodyNode, tag, id, classes)
    //console.log(startingNode)
    let nodesIdsArray = []
    let nodesIds = getAllDescendantNodesIds(startingNode, nodesIdsArray)

    let allNodesStyles = await getAllDescendantNodesStyles(cdp, nodesIds)

    const sectionCss = cleanStyles(allNodesStyles, url)

    //let lines = sectionCss.match(/\n/g)
    //console.log(lines.length)

    //sectionCss = sectionCss.replaceAll("background-image: url('", "background-image: url('" + url)

    //console.log(startingNode)
    //console.log(sectionHtml)
    //console.log(sectionCss)


    //https://openclassrooms.com/en/ homeHeroBanner
    //https://courses.webdevsimplified.com/ sc-egkSDF eIKSQH
    // section sc-egkSDF eIKSQH

    /* const nodeStyles = await cdp.send("CSS.getMatchedStylesForNode", {
        nodeId: 49
    }) */

    //console.log(myNode)

    
    /* const nodeStyles = await cdp.send("CSS.getMatchedStylesForNode", {
        nodeId: myNode.nodeId
    })
    for(var x = 3; x < nodeStyles.matchedCSSRules.length; x++){
        customStyles += nodeStyles.matchedCSSRules[x].rule.selectorList.text
        customStyles += "{"
        customStyles += nodeStyles.matchedCSSRules[x].rule.style.cssText
        customStyles += "}"
    } */
    
    //let nodesIds = getAllDescendantNodesIds(bodyNode, nodesIdsArray)
    //getAllDescendantNodesIds(myNode)
    //let nodesIds = getAllDescendantNodesIds(startingNode, nodesIdsArray)

    //console.log(nodesIds)

    //let allNodesStyles = await getAllDescendantNodesStyles(cdp, nodesIds)

    //let cleanedStyles = cleanStyles(allNodesStyles)

    //console.log(allNodesStyles)

    /* await page.goto("https://en.wikipedia.org/wiki/Srettha_Thavisin")
    
    const document = await page.$eval('link', el => el.href);

    await page.goto(document)

    const cssText = await page.$eval('pre', el => el.innerHTML);
    
    console.log(cssText) */
    /*
    const html = await page.$eval('body', el => el.innerHTML);
    const css = await page.$eval('style', el => el.innerHTML);
    const ele = await page.$("body");
    const width = await page.$eval("nav", el => getComputedStyle(el).getPropertyValue("width"))
    const height = await page.$eval("nav", el => getComputedStyle(el).getPropertyValue("height"))
    
    
    await page.setViewport({ 
        width: parseInt(width.slice(0, width.length - 2)),
        height: parseInt(height.slice(0, height.length - 2))
    });
    
    await page.setViewport({ width: 580, height: 300 })
    await ele.screenshot({ path: "image.jpeg" })
    */

    await browser.close();

    return { sectionHtml, sectionCss }
}

module.exports = { readHTMLwriteJSON, scrapeTemplate }