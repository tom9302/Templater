import "./about.css"

export function About() {
    return (
        <div className="about py-5">
            <div className="main-wrapper mx-auto d-flex justify-content-between align-items-center">
                <div className="w-50 d-flex">
                    <div className="mx-auto">
                        <div className="site-title fw-bold text-white">Templater</div>

                        <div className="d-flex align-items-center gap-3 mt-4">
                            <i className="fa-solid fa-envelope"></i>
                            <div>templater@hotmail.com</div>
                        </div>
                        <div className="d-flex align-items-center gap-3 my-3">
                            <i className="fa-solid fa-location-dot"></i>
                            <div>John Doe street avenue</div>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <i className="fa-solid fa-phone"></i>
                            <div>+12345678910</div>
                        </div>
                    </div>
                    
                </div>

                <div className="w-50 d-flex learn-divider">
                    <div className="mx-auto">
                        <div className="text-white fw-bold">Learn</div>
                        <div className="learn d-flex flex-column gap-2 mt-3">
                            <div>What is Templater?</div>
                            <div>Features</div>
                            <div>FAQs</div>
                            <div>Support</div>
                        </div>
                    </div>
                    
                </div>
            </div>

            <div className="d-flex justify-content-center socials gap-4 mt-5">
                <div className="p-2"><i className="fa-brands fa-github"></i></div>
                <div className="p-2"><i className="fa-brands fa-facebook-f"></i></div>
                <div className="p-2"><i className="fa-brands fa-linkedin"></i></div>
            </div>
        </div>
    )
}