import "./how.css"

export function How() {
    return (
        <div className="how">

            <div className="heading">How To Use</div>

            <div className="d-flex main mt-3">
                <div className="position-relative">
                    <img src="/images/inspect.png" width="90%" alt="" />

                    <div className="position-absolute w-100 absolute-image">
                        <img src="/images/hover.png" width="90%" alt="" />
                    </div>
                </div>

                <div className="steps d-flex flex-column justify-content-center gap-3">
                    <div className="d-flex align-items-center gap-4 position-relative">
                        <div className="step-index d-flex align-items-center justify-content-center">1</div>
                        <div className="step">Visit the website you wish to extract a section from.</div>
                    </div>
                    <div className="d-flex align-items-center gap-4 position-relative">
                        <div className="step-index d-flex align-items-center justify-content-center">2</div>
                        <div className="step">Right click and click on "inspect element"</div>
                    </div>
                    <div className="d-flex align-items-center gap-4 position-relative">
                        <div className="step-index d-flex align-items-center justify-content-center">3</div>
                        <div className="step">
                            Click the icon on the top-left corner of Devtools as highlighted in the first image.
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-4 position-relative">
                        <div className="step-index d-flex align-items-center justify-content-center position-absolute start-0">4</div>
                        <div className="step">
                            Click on the section you want to extract. The HTML code of the section will be automatically highlighted.
                        </div>
                    </div>
                    <div className="d-flex align-items-center gap-4 position-relative">
                        <div className="step-index d-flex align-items-center justify-content-center">5</div>
                        <div className="step">Now copy the text inside the "class" or "id" attributes</div>
                    </div>
                    <div className="d-flex align-items-center gap-4 position-relative">
                        <div className="step-index d-flex align-items-center justify-content-center">6</div>
                        <div className="step">Fill the form and click "Extract Template"</div>
                    </div>
                </div>
            </div>

        </div>
    )
}