const fs = require("fs")
const path = require("path")

const { readHTMLwriteJSON, takeScreenshot } = require("./puppeteerFunctions")

function createTemplate(html, css){
    let templatePath = "./templates/";
    let templateCategory;

    fs.access(templatePath, (error) => {
        // To check if the given directory 
        // already exists or not
        if (error) {
            // If current directory does not exist
            // then create it
            fs.mkdir(templatePath, (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("New Directory created successfully !!");

                    copyReadWrite(html, css)
                }
            });
        } else {
            console.log("Given Directory already exists !!");

            copyReadWrite(html, css)
        }
    });
}

function copyReadWrite(html, css) {
    const newTemplatePath = "templates/template.html"

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
                } else {
                    //takeScreenshot()
                    // file written successfully

                    /* let normalPath =
                        path.resolve("./templates/" + templateCategory + "/", templateName + ".html")
                    let modifiedFilePath = "file:///" + normalPath.replaceAll("\\", "/")
                    let templateFileName = templateName + ".html"
                    let templateImagePath = "templates/" + templateCategory + "/" + templateName + ".jpg";
                    let navbarPreviewPath =
                        "templates/" + templateCategory + "/" + templateName + "-preview.jpg"; */

                    /* readHTMLwriteJSON(modifiedFilePath, templateCategory, templateFileName, templateName, templateImagePath, navbarPreviewPath) */
                }
            });
        });
    });
}

module.exports = { createTemplate, copyReadWrite }