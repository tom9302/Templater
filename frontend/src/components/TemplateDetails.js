import { useState } from "react"
import "./templateDetails.css"

export function TemplateDetails() {
    const [url, setUrl] = useState("")
    const [tag, setTag] = useState("")
    const [id, setId] = useState("")
    const [classText, setClassText] = useState("")

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
        } else {
            console.log(json)
        }
    }

    return (
        <div className="d-flex flex-column w-100 h-100 justify-content-around create-section ">
            <div className="d-flex flex-column align-items-center">

                <h4>
                    URL :
                    <input
                        type="text"
                        className="mx-2 url-field"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </h4>

                <h4>
                    Tag :
                    <input
                        type="text"
                        className="mx-2"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                </h4>

                <h4>
                    Id :
                    <input
                        type="text"
                        className="mx-2"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </h4>

                <h4>
                    Class(es) :
                    <input
                        type="text"
                        className="mx-2"
                        value={classText}
                        onChange={(e) => setClassText(e.target.value)}
                    />
                </h4>

            </div>

            <div className="d-flex justify-content-center">
                <button className="col-sm-3 h3" onClick={handleScrape}>SCRAPE</button>
                <a href="http://localhost:3001/template">DEMO</a>
            </div>
        </div>
    )
}