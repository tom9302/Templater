import "./hero.css"

export function Hero() {
    return (
        <div className="hero">
            <div className="main-wrapper mx-auto d-flex justify-content-between">

                <div className="general-description d-flex flex-column justify-content-center">
                    <div className="heading">
                        Extract Any Website Section in Seconds!
                    </div>
                    <div className="description">
                        Effortlessly scrape and save HTML snippets with precision—no coding required.
                    </div>
                    <button className="custom-btn rounded-pill text-white py-3 px-5 w-100">
                        Extract For Free
                    </button>
                </div>

                <div className="banner-img w-50">
                    <img src="/images/templater-banner.jpg" alt="" />
                </div>

            </div>
        </div>
    )
}