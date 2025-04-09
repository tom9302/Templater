function ScrapeDetails({ visible, setVisibility, data }) {
    const [url, setUrl] = React.useState("")
    const [tag, setTag] = React.useState("")
    const [id, setId] = React.useState("")
    const [classText, setClassText] = React.useState("")
    const [templateName, setTemplateName] = React.useState("")
    const [selectedCategory, setSelectedCategory] = React.useState("Add new...")
    const [newCategory, setNewCategory] = React.useState("")

    const categories = data && Object.keys(data)

    React.useEffect(() => {
        if (categories && categories.length > 0) {
            setSelectedCategory(categories[0])
        }
    }, [data])

    async function handleScrape() {
        var idSelector = ""
        var classesSelector = ""

        if(id !== ""){
            idSelector = "#" + id
        }
        if(classText !== ""){
            classesSelector = "." + classText.replaceAll(" ",".");
        }

        const selector = tag + idSelector + classesSelector

        const response = await fetch("http://localhost:4000/scrape", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                url, tag, id, classText, selector, templateName, selectedCategory, newCategory
            })
        })

        
    }

    return (
        <div className={"d-flex flex-column w-100 h-100 justify-content-around create-section " +
            (visible ? "position-absolute start-0 top-0" : "d-none")
        }>
            <div className="d-flex flex-column align-items-center">

                <h4 className="text-white">
                    URL : 
                    <input
                        type="text"
                        className="mx-2 url-field"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </h4>

                <h4 className="text-white">
                    Tag : 
                    <input
                        type="text"
                        className="mx-2"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                    />
                </h4>

                <h4 className="text-white">
                    Id : 
                    <input
                        type="text"
                        className="mx-2"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </h4>

                <h4 className="text-white">
                    Class(es) : 
                    <input
                        type="text"
                        className="mx-2"
                        value={classText}
                        onChange={(e) => setClassText(e.target.value)}
                    />
                </h4>

                <h4 className="text-white">
                    Template name :
                    <input
                        type="text"
                        className="mx-2"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                    />
                </h4>
                <h4 className="text-white">Template category :
                    <select
                        name="categories"
                        id="select-category"
                        className="mx-2 px-2"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}>
                        {
                            categories && categories.map((category, i) =>
                                <option key={i} value={category}>
                                    {category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            )
                        }
                        <option value="Add new...">Add new...</option>
                    </select>
                    <input
                        type="text"
                        className={selectedCategory === "Add new..." ? "px-2 py-1" : "d-none"}
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                    />
                    
                </h4>
            </div>
            <div>

            </div>

            <div className="d-flex justify-content-center">
                <button className="col-sm-3 h3" onClick={handleScrape}>SCRAPE</button>
                <button className="col-sm-3 h3" onClick={() => setVisibility(false)}>CANCEL</button>
            </div>
        </div>
    )
}