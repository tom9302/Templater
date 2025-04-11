import { HashLink } from "react-router-hash-link"
import "./navbar.css"

export function Navbar() {
    return (
        <div className="navbar main-wrapper d-flex justify-content-between position-absolute text-white">
            <HashLink className="logo-title">Templater</HashLink>
            <div className="d-flex gap-5 nav-links">
                <HashLink>Home</HashLink>
                <HashLink>App</HashLink>
                <HashLink>FAQs</HashLink>
                <HashLink>About</HashLink>
            </div>
        </div>
    )
}