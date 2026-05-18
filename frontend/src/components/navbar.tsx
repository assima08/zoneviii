import "../styles/navbar.css"

function Navbar() {

    return (

        <nav className="navbar">

            <div className="logo">
                ZoneVIII
            </div>

            <ul className="nav-links">

                <li>Services</li>

                <li>Tarifs</li>

                <li>Réservations</li>

                <li>Nous contacter</li>

            </ul>

            <div className="menu-icon">
                ☰
            </div>

        </nav>
    )
}

export default Navbar