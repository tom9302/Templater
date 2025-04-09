const fs = require("fs")
const path = require("path")

const { readHTMLwriteJSON } = require("./puppeteerFunctions")

function createTemplate(templateName, selectedCategory, newCategory, html, css){
    let templatePath = "./templates/";
    let templateCategory;

    if(selectedCategory == "Add new..."){
        templateCategory = newCategory.toLowerCase()
        templatePath += templateCategory
    }
    else{
        templateCategory = selectedCategory.toLowerCase()
        templatePath += templateCategory
    }

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

                    copyReadWrite(templateName, templateCategory, html, css)
                }
            });
        } else {
            console.log("Given Directory already exists !!");

            copyReadWrite(templateName, templateCategory, html, css)
        }
    });
}

function copyReadWrite(templateName, templateCategory, html, css) {
    const newTemplatePath = "templates/" + templateCategory + "/" + templateName + ".html"

    fs.copyFile("blank-file.html", newTemplatePath, (err) => {
        console.log(err)

        fs.readFile(newTemplatePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            data = data.replace("<body>", "<body> \n \t " + html)
            data = data.replace("<style>", "<style> \n \t " + css)

            fs.writeFile(newTemplatePath, data, err => {
                if (err) {
                    console.error(err);
                } else {
                    // file written successfully

                    let normalPath =
                        path.resolve("./templates/" + templateCategory + "/", templateName + ".html")
                    let modifiedFilePath = "file:///" + normalPath.replaceAll("\\", "/")
                    let templateFileName = templateName + ".html"
                    let templateImagePath = "templates/" + templateCategory + "/" + templateName + ".jpg";
                    let navbarPreviewPath =
                        "templates/" + templateCategory + "/" + templateName + "-preview.jpg";

                    readHTMLwriteJSON(modifiedFilePath, templateCategory, templateFileName, templateName, templateImagePath, navbarPreviewPath)
                }
            });
        });
    });
}

module.exports = { createTemplate }