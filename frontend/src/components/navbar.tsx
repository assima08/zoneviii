import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.css";

const navLinks = [
    { label: "TARIFS", to: "/tarifs" },
    { label: "EXPERTS", to: "/experts" },
    { label: "REALISATIONS", to: "/realisations" },
    { label: "FORMATIONS", to: "/formations" },
    { label: "ACADEMY", to: "/blog" },
    { label: "A PROPOS", to: "/a-propos" },
    { label: "FAQ", to: "/faq" },
    { label: "RESERVATIONS", to: "/reservations" },
    { label: "CONTACT", to: "/contact" },
];

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    function closeMenu() {
        setIsOpen(false);
    }

    return (
        <nav className="navbar" aria-label="Navigation principale">
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
