import {

    BrowserRouter,

    Routes,

    Route

} from "react-router-dom";

import "../styles/global.css";

import Navbar from "../components/navbar.tsx";

import Footer from "../components/footer.tsx";

import Home from "../pages/Home";

import Services from "../pages/Services";

import Tarifs from "../pages/Tarifs";

import Reservations from "../pages/Reservations";

import Contact from "../pages/Contact";


function AppRoutes() {

    return (

        <BrowserRouter>

            <div className="app-layout">

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
                        path="/contact"
                        element={<Contact />}
                    />

                </Routes>

                <Footer />

            </div>

        </BrowserRouter>
    );
}

export default AppRoutes;