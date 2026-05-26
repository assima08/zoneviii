import { Link } from "react-router-dom";

import "../styles/navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">ZONEVIII</Link>
            </div>

            <ul className="nav-links">
                <li><Link to="/services">SERVICES</Link></li>
                <li><Link to="/tarifs">TARIFS</Link></li>
                <li><Link to="/experts">NOS EXPERTS</Link></li>
                <li><Link to="/reservations">RESERVATIONS</Link></li>
                <li><Link to="/contact">NOUS CONTACTER</Link></li>
            </ul>

            <div
                className="menu-icon"
                aria-hidden="true"
            >
                Menu
            </div>
        </nav>
    );
}

export default Navbar;
