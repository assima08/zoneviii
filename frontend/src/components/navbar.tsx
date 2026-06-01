import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.css";

const navLinks = [
    { label: "SERVICES", to: "/services" },
    { label: "TARIFS", to: "/tarifs" },
    { label: "NOS EXPERTS", to: "/experts" },
    { label: "NOS RÉALISATION", to:"/realisations"},
    { label: "RESERVATIONS", to: "/reservations" },
    { label: "NOUS CONTACTER", to: "/contact" },
];

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    function closeMenu() {
        setIsOpen(false);
    }

    return (
        <nav className="navbar">
            <div className="logo">
                <Link
                    to="/"
                    onClick={closeMenu}
                >
                    ZONEVIII
                </Link>
            </div>

            <button
                className={`menu-icon ${isOpen ? "menu-icon-open" : ""}`}
                type="button"
                aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isOpen}
                onClick={() => setIsOpen((currentValue) => !currentValue)}
            >
                <span />
                <span />
                <span />
            </button>

            <ul className={`nav-links ${isOpen ? "nav-links-open" : ""}`}>
                {navLinks.map((link) => (
                    <li key={link.to}>
                        <Link
                            to={link.to}
                            onClick={closeMenu}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;