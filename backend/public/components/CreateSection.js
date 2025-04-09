function CreateSection({ visible, setVisibility, data }) {
  const [templateName, setTemplateName] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("Add new...")
  const [newCategory, setNewCategory] = React.useState("")
  const [html, setHtml] = React.useState("")
  const [css, setCss] = React.useState("")

  const categories = data && Object.keys(data)

  React.useEffect(() => {
    if (categories && categories.length > 0) {
      setSelectedCategory(categories[0])
    }
  }, [data])

  async function handleCreate() {
    const response = await fetch("http://localhost:4000/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ templateName, selectedCategory, newCategory, html, css })
    })
  }

  return (
    <div className={"d-flex flex-column w-100 h-100 justify-content-center create-section " +
      (visible ? "position-absolute start-0 top-0" : "d-none")
    }>
      <div className="d-flex flex-column align-items-center">
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
            className="mx-2 px-2 py-1"
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
      <div className="d-flex h-75">
        <div className="d-flex flex-column justify-content-center align-items-center w-100 m-2">
          <h4 className="text-center text-white fw-bold">HTML</h4>
          <code className="w-100 h-100 p-1">
            <textarea
              className="w-100 h-100"
              value={html}
              onChange={(e) => setHtml(e.target.value)}>
            </textarea>
          </code>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center w-100 m-2">
          <h4 className="text-center text-white fw-bold">CSS</h4>
          <code className="w-100 h-100 p-1">
            <textarea
              className="w-100 h-100"
              value={css}
              onChange={(e) => setCss(e.target.value)}>
            </textarea>
          </code>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button className="col-sm-3 h3" onClick={handleCreate}>CREATE</button>
        <button className="col-sm-3 h3" onClick={() => setVisibility(false)}>CANCEL</button>
      </div>
    </div>
  )
}