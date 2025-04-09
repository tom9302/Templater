function SingleTemplate({ template }) {
  const [showButtonsSection, setShowButtonsSection] = React.useState(false)

  return (
    <div
      className="d-flex flex-column align-items-center border">
      <a href={"templates/" + template.category + "/" + template.fileName} target="_blank">
        {template.name}
      </a>
      <div
        className="template-section d-flex flex-column justify-content-center align-items-center gap-2"
        href={"templates/" + template.category + "/" + template.fileName} target="_blank"
        onMouseEnter={() => setShowButtonsSection(true)}
        onMouseLeave={() => setShowButtonsSection(false)}
        style={{
          backgroundImage: "url(" + template.image + ")",
        }}>
          <div
            className={(!showButtonsSection && "d-none") + " w-100 h-100 d-flex flex-column justify-content-center align-items-center template-buttons gap-3"}>
              <a href={"templates/" + template.category + "/" + template.fileName} target="_blank">
                <button>VIEW</button>
              </a>
              <a onClick={() => navigator.clipboard.writeText(template.html)}><button>COPY HTML</button></a>
              <a onClick={() => navigator.clipboard.writeText(template.css)}><button>COPY CSS</button></a>
          </div>
            
      </div>
      {
        template.category === "navbars" ?
          (
            <img
              src={template.preview}
              width={template.previewWidth}
              height={template.previewHeight}
              className="position-absolute start-0 top-50 mx-2"
              style={{
                display: showButtonsSection ? "block" : "none",
              }}
            />
          )
          :
          <span></span>
      }
    </div>
  )
}