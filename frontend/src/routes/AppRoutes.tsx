import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
//importation des components
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import SeoManager from "../components/SeoManager";
//importation des pages
import Contact from "../pages/Contact";
import Experts from "../pages/Experts";
import Home from "../pages/Home";
import Reservations from "../pages/Reservations";
import Tarifs from "../pages/Tarifs";
import Realisations from "../pages/Realisations";
//importation des styles
import "../styles/global.css";
import "../styles/responsive.css";
import Formation from "../pages/Formations";


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
                        element={<Navigate to="/tarifs" replace />}
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
                        path="/Formations" 
                        element={<Formation />} />
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
