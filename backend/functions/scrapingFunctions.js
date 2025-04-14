async function getNodeStyles(cdp, id){
    const node = await cdp.send("DOM.describeNode", {
        nodeId: id
    })

    if(node.node.nodeType == 1) {
        const nodeStyles = await cdp.send("CSS.getMatchedStylesForNode", {
            nodeId: id
        })

        return nodeStyles
    }  
}

async function getAllDescendantNodesStyles(cdp, nodesIds){
    let allNodesStyles = []

    for(var a = 0; a < nodesIds.length; a++) {
        let nodeStyles = await getNodeStyles(cdp, nodesIds[a])

        if(nodeStyles){
            allNodesStyles.push(nodeStyles.matchedCSSRules)

            for(var z = 3; z < nodeStyles.inherited.length; z++) {
                allNodesStyles.push(nodeStyles.inherited[z].matchedCSSRules)
            }
        }
    }

    return allNodesStyles
}

function cleanStyles(allNodesStyles, url){
    let cleanedStyles = ""
    let cssRulesArray = []

    for(var n = 0; n < allNodesStyles.length; n++) {
        for(var x = 3; x < allNodesStyles[n].length; x++) {

            let cssSegment = ""
            let selectorsList = allNodesStyles[n][x].rule.selectorList.text
            cssSegment += selectorsList
            cssSegment += "{ \n"
            let cssRule = allNodesStyles[n][x].rule.style.cssText

            if(cssRule && cssRule.includes("background-image")) {
                cssRule = cssRule.replace("url(", "url(" + url)
            }

            let cssLine = " \t"

            for(var q = 0; cssRule && (q < cssRule.length); q++) {
                cssLine += cssRule[q]
                if(cssRule[q] == ";"){
                    cssLine += " \n \t"
                }
            }

            cssSegment += cssLine
            cssSegment += "\n } \n \n"

            if(!cssRulesArray.find(e => e == cssSegment)) {
                cssRulesArray.push(cssSegment)
                cleanedStyles += cssSegment
            }
        } 
    }

    return cleanedStyles
}

function getAllDescendantNodesIds(node, nodesIds){
    let id = node.nodeId
    nodesIds.push(id)

    if(node.childNodeCount > 0) {
        node.children.map(e => getAllDescendantNodesIds(e, nodesIds))
    }

    return nodesIds
}

function verifyNode(node){
    let tag = node.localName
    let id
    let classTextIndex
    let classText

    if(node.hasOwnProperty("attributes")) {
        idIndex = node.attributes.indexOf("id") + 1
        id = node.attributes[idIndex]

        classTextIndex = node.attributes.indexOf("class") + 1
        classText = node.attributes[classTextIndex]
    }

    return { tag, id, classText }
}

function findStartingNode(node, sentTag, sentId, sentClasses){
    if(node.nodeType == 1) {
        if(node.childNodeCount > 0) {
            for(var x = 0; x < node.children.length; x++) {
                let currentNode = node.children[x]
                const { tag, id, classText } = verifyNode(currentNode)

                if(tag == sentTag && (id == sentId || classText == sentClasses)) {
                    return currentNode 
                }

                var startingNode = findStartingNode(currentNode, sentTag, sentId, sentClasses)

                if(startingNode) {
                    break
                }
            }
        }  
    }

    return startingNode
}

module.exports = { findStartingNode, getAllDescendantNodesIds, getAllDescendantNodesStyles, cleanStyles }