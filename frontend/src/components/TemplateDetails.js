import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CustomBtn } from "./sub-components/CustomBtn"
import download from 'downloadjs';
import "./templateDetails.css"

export function TemplateDetails() {
    const [url, setUrl] = useState("https://courses.webdevsimplified.com/")
    const [tag, setTag] = useState("section")
    const [id, setId] = useState("")
    const [classText, setClassText] = useState("sc-dVBluf htlnUh")

    const [templateHtml, setTemplateHtml] = useState(null)
    const [templateCss, setTemplateCss] = useState(null)
    const [templateImage, setTemplateImage] = useState(null)

    const [fetchStatus, setFetchStatus] = useState(false)
    const [fetchMessage, setFetchMessage] = useState(null)

    useEffect(() => {
        const image = localStorage.getItem("image")
        //setTemplateImage(image)
    }, [])

    async function handleScrape() {
        setFetchStatus("loading")
        setFetchMessage("Please wait. This will take less than a minute.")
        var idSelector = ""
        var classesSelector = ""

        if (id !== "") {
            idSelector = "#" + id
        }
        if (classText !== "") {
            classesSelector = "." + classText.replaceAll(" ", ".");
        }

        const selector = tag + idSelector + classesSelector

        //   "proxy": "https://templater-liart.vercel.app",
        // https://templater-6y57.vercel.app
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/scrape`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url, tag, id, classText, selector })
        })

        console.log(response)

        const json = await response.json()
    
        if (response.status === 200) {
            setTemplateHtml(json.sectionHtml)
            setTemplateCss(json.sectionCss)
            const base64String = btoa(String.fromCharCode(...new Uint8Array(json.screenshot.data)));
            setTemplateImage(base64String)
            setFetchStatus("success")
            setFetchMessage(json.error)
        } else {
            setFetchStatus("error")
            setFetchMessage(json.error)
        }
    }

    function copyCode(code) {
        const clipBoard = navigator.clipboard;
        clipBoard.writeText(code);
    }

    async function downloadTemplate() {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/download`)
        const blob = await response.blob()
        download(blob, "template.html")
    }

    // https://courses.webdevsimplified.com/
    // section
    // sc-dVBluf htlnUh
    // sc-dVBluf iCwPFA

    return (
        <div id="app" className="template-details main-wrapper mx-auto">

            <div className="text-center">
                <h2>Test this app with these classes for different sections from WebDevSimplified :</h2>
                <div className="my-5 examples-classes">
                    <h4>Header : <span>sc-dVBluf htlnUh</span></h4>
                    <h4>Signup form : <span>sc-dVBluf iCwPJg</span></h4>
                    <h4>Course section : <span>sc-dVBluf fvTFPJ</span></h4>
                </div>
            </div>
            

            <div className="d-flex">
                <div className="d-flex flex-column justify-content-center gap-3 form px-3">
                    <div>
                        URL :
                        <input
                            type="text"
                            className="rounded-pill"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    <div>
                        Tag :
                        <input
                            type="text"
                            className="rounded-pill"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        />
                    </div>

                    <div>
                        Id :
                        <input
                            type="text"
                            className="rounded-pill"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div>

                    <div>
                        Class(es) :
                        <input
                            type="text"
                            className="rounded-pill"
                            value={classText}
                            onChange={(e) => setClassText(e.target.value)}
                        />
                    </div>
                </div>

                <div className="image d-flex flex-column align-items-center justify-content-center px-2 border rounded-1">
                    {
                        fetchStatus === "loading" ?
                            <div className="d-flex flex-column gap-3 align-items-center justify-content-center h-100">
                                <div className="loader"></div>
                                <div>
                                    {fetchMessage}
                                </div>
                            </div>
                            : fetchStatus === "success" ?
                            <>
                                <img src={`data:image/png;base64,${templateImage}`} width="100%" alt="" />

                                <div className={templateImage ? "mt-5" : "d-none"}>
                                    <div className="d-flex gap-5">
                                        <div className="d-flex align-items-center gap-4">
                                            <i className="fa-solid fa-code"></i>
                                            <Link onClick={() => copyCode(templateHtml)}>Copy HTML</Link>
                                        </div>
                                        <div className="d-flex align-items-center gap-4">
                                            <i className="fa-solid fa-hashtag"></i>
                                            <Link onClick={() => copyCode(templateCss)}>Copy CSS</Link>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-5 justify-content-between mt-3">
                                        <div className="d-flex align-items-center gap-4">
                                            <i className="fa-solid fa-eye"></i>
                                            <Link to={`${process.env.REACT_APP_BACKEND_URL}/api/template`} target="_blank">
                                                Preview
                                            </Link>
                                        </div>
                                        <div className="d-flex align-items-center gap-4">
                                            <i className="fa-solid fa-download"></i>
                                            <Link onClick={downloadTemplate}>Download</Link>
                                        </div>
                                    </div>
                                </div>
                            </>
                            : fetchStatus === "error" ?
                            <div>
                                {fetchMessage}
                            </div>
                            :
                            null
                    }
                </div>
            </div>

            <div className="d-flex justify-content-center mt-5">
                <CustomBtn
                    text="Extract Template"
                    btnFunction={handleScrape}
                />
            </div>
        </div>
    )
}