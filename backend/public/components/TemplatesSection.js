function TemplatesSection({ data, activeCategory, setCreateSection, setScrapeSection }) {
  const [templates, setTemplates] = React.useState(null)

  React.useEffect(() => {
    const dataArray = data && Object.keys(data).map(category => {
      return Object.keys(data[category]).map(template => {
        return {
          ...data[category][template],
          category,
          fileName: data[category][template].name + ".html"
        }
      })
    })

    setTemplates(dataArray)
  }, [data])

  return (
    <React.Fragment>
      <div className="d-flex flex-wrap gap-5 p-3 justify-content-center">
        {
          activeCategory === "ALL" ?
            templates && templates.map((category, i) =>
              category.map((template, j) => (
                <SingleTemplate
                  key={j}
                  template={template}
                />
              ))
            )
            :
            templates && templates.map((category, i) =>
              category.filter(a => a.category.toUpperCase() === activeCategory).map((template, j) => (
                <SingleTemplate
                  key={j}
                  template={template}
                />
              ))
            )
        }

      </div>
      <div className="d-flex justify-content-center gap-5 custom-btns">
        <button onClick={() => setCreateSection(true)}>Create template</button>
        <button onClick={() => setScrapeSection(true)}>Scrape template</button>
      </div>
    </React.Fragment>
  )
}