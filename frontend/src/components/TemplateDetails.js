import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CustomBtn } from "./sub-components/CustomBtn"
import "./templateDetails.css"

export function TemplateDetails() {
    const [url, setUrl] = useState("")
    const [tag, setTag] = useState("")
    const [id, setId] = useState("")
    const [classText, setClassText] = useState("")

    const [templateHtml, setTemplateHtml] = useState(null)
    const [templateCss, setTemplateCss] = useState(null)
    const [templateImage, setTemplateImage] = useState(null)

    //document.execCommand('copy')
    //console.log(templateHtml)

    useEffect(() => {
        const image = localStorage.getItem("image")
        setTemplateImage(image)
    }, [])

    async function handleScrape() {
        var idSelector = ""
        var classesSelector = ""

        if (id !== "") {
            idSelector = "#" + id
        }
        if (classText !== "") {
            classesSelector = "." + classText.replaceAll(" ", ".");
        }

        const selector = tag + idSelector + classesSelector

        const response = await fetch("http://localhost:3001/scrape", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url, tag, id, classText, selector })
        })
        const json = await response.json()

        if (json) {
            console.log(json)
            setTemplateHtml(json.sectionHtml)
            setTemplateCss(json.sectionCss)
            const base64String = btoa(String.fromCharCode(...new Uint8Array(json.screenshot.data)));
            setTemplateImage(base64String)
            //console.log(base64String)
        } else {
            console.log(json)
        }
    }

    return (
        <div className="template-details main-wrapper mx-auto">

            <div className="d-flex">
                <div className="d-flex flex-column justify-content-center gap-3 form border w-50 px-3">
                    <div>
                        URL :
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    <div>
                        Tag :
                        <input
                            type="text"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        />
                    </div>

                    <div>
                        Id :
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>

                    <div>
                        Class(es) :
                        <input
                            type="text"
                            value={classText}
                            onChange={(e) => setClassText(e.target.value)}
                        />
                    </div>
                </div>

                <div className="image d-flex flex-column align-items-center px-2 border w-50">
                    <img src={`data:image/png;base64,${templateImage}`} width="100%" alt="" />

                    <div className={templateImage ? "mt-3" : "d-none"}>
                        <button>Copy HTML</button>
                        <button>Copy CSS</button>
                        <button>Download</button>
                        <Link to="http://localhost:3001/template">Preview</Link>
                    </div>
                    
                </div>
            </div>





            <div className="d-flex justify-content-center mt-4">
                <CustomBtn
                    text="Extract Template"
                    btnFunction={handleScrape}
                />
            </div>
        </div>
    )
}