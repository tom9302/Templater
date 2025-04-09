function CategoriesSection({ data, activeCategory, setActiveCategory }) {
  return (
    <div id="categories-section" className="bg-dark text-white d-flex justify-content-center gap-3 p-3">
      <div
        className={"category " + (activeCategory === "ALL" ? "active-category" : "")}
        onClick={(e) => setActiveCategory(e.target.innerText)}>
        ALL
      </div>
      {
        data && Object.keys(data).map((e, i) => (
          <div
            key={i}
            className={"category " + (activeCategory === e.toUpperCase() ? "active-category" : "")}
            onClick={(e) => setActiveCategory(e.target.innerText)}>
            {e.toUpperCase()}
          </div>
        ))
      }
    </div>
  )
}