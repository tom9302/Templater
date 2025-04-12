import { CustomBtn } from "./sub-components/CustomBtn"
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
                    <CustomBtn text="Extract For Free" />
                </div>

                <div className="banner-img w-50">
                    <img src="/images/templater-banner.jpg" alt="" />
                </div>

            </div>
        </div>
    )
}