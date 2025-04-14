import { useState } from "react"
import { HashLink } from "react-router-hash-link"
import "./navbar.css"

export function Navbar() {
    const [linksDisplay, setLinksDisplay] = useState(false)

    return (
        <div className="navbar main-wrapper d-flex justify-content-between position-absolute text-white">
            <i onClick={() => setLinksDisplay(true)} className="fa-solid fa-bars position-absolute"></i>
            <HashLink className="logo-title">Templater</HashLink>
            <div className="d-flex gap-5 nav-links" style={{
                width: linksDisplay && window.innerWidth < 720 ? "50%" : "0",
                left: linksDisplay && window.innerWidth < 720 ? "0" : "-8%",
                transition: "0.3s"
            }}>
                <i onClick={() => setLinksDisplay(false)} className="fa-solid fa-x"></i>
                <HashLink>Home</HashLink>
                <HashLink to="#app">App</HashLink>
                <HashLink to="#faqs">FAQs</HashLink>
                <HashLink to="#contact">Contact</HashLink>
            </div>
        </div>
    )
}