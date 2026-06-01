import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "../components/footer";
import Navbar from "../components/navbar";
import SeoManager from "../components/SeoManager";
import Contact from "../pages/Contact";
import Experts from "../pages/Experts";
import Home from "../pages/Home";
import Reservations from "../pages/Reservations";
import Services from "../pages/Services";
import Tarifs from "../pages/Tarifs";
import "../styles/global.css";
import "../styles/responsive.css";
import Realisations from "../pages/Realisations";

function AppRoutes() {
    return (
        <BrowserRouter>
            <div className="app-layout">
                <SeoManager />
                <Navbar />

                <Routes>
                    <Route
                        path="/"
                        element={<Home />}
                    />
                    
                   <Route
                        path="/services"
                        element={<Services />}
                    />
                    
                    <Route
                        path="/tarifs"
                        element={<Tarifs />}
                    />
                    <Route
                        path="/reservations"
                        element={<Reservations />}
                    />
                    <Route 
                        path="/realisations" 
                        element={<Realisations />} />
                    <Route
                        path="/experts"
                        element={<Experts />}
                    />
                    <Route
                        path="/contact"
                        element={<Contact />}
                    />
                    <Route
                        path="*"
                        element={<Home />}
                    />
                </Routes>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default AppRoutes;
