import "../styles/navbar.css"
import { Link } from "react-router-dom";


function Navbar() {

    return (

        <nav className="navbar">

            <div className="logo">
                <Link to="/">ZONEVIII</Link>
            </div>

            <ul className="nav-links">

                <li> <Link to="/services">SERVICES</Link> </li>

                <li><Link to="/tarifs">TARIFS</Link></li>

                <li><Link to="/reservations">RÉSERVATIONS</Link></li>

                <li><Link to="/contact">NOUS CONTACTER</Link></li>

            </ul>

            <div className="menu-icon">
                ☰
            </div>

        </nav>
    )
}

export default Navbar