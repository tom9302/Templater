function App() {
  const [data, setData] = React.useState(null)
  const [activeCategory, setActiveCategory] = React.useState("ALL")
  const [createSection, setCreateSection] = React.useState(false)
  const [scrapeSection, setScrapeSection] = React.useState(false)

  React.useEffect(() => {
    fetch("http://localhost:4000/data2")
      .then(res => res.json())
      .then(res => setData(res))
  }, [])

  return (
    <React.Fragment>
      
      <CategoriesSection
        data={data}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <TemplatesSection
        data={data}
        activeCategory={activeCategory}
        setCreateSection={setCreateSection}
        setScrapeSection={setScrapeSection}
      />
      {
        createSection ?
          <CreateSection
            visible={true}
            setVisibility={setCreateSection}
            data={data}
          />
          :
          <CreateSection
            visible={false}
            setVisibility={setCreateSection}
            data={data}
          />
      }
      {
        scrapeSection ?
          <ScrapeDetails
            visible={true}
            setVisibility={setScrapeSection}
            data={data}
          />
          :
          <ScrapeDetails
            visible={false}
            setVisibility={setScrapeSection}
            data={data}
          />
      }

    </React.Fragment>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);