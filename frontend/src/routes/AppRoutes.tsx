import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Footer from "../components/footer";
import Navbar from "../components/navbar";
import SeoManager from "../components/SeoManager";
import About from "../pages/About";
import Blog from "../pages/Blog";
import BlogArticleRecordingTips from "../pages/BlogArticleRecordingTips";
import Contact from "../pages/Contact";
import Experts from "../pages/Experts";
import FAQ from "../pages/FAQ";
import Formations from "../pages/Formations";
import Home from "../pages/Home";
import Portfolio from "../pages/Portfolio";
import Realisations from "../pages/Realisations";
import Reservations from "../pages/Reservations";
import Tarifs from "../pages/Tarifs";
import "../styles/global.css";
import "../styles/responsive.css";

function AppRoutes() {
    return (
        <BrowserRouter>
            <div className="app-layout">
                <SeoManager />
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/services" element={<Navigate to="/tarifs" replace />} />
                    <Route path="/tarifs" element={<Tarifs />} />
                    <Route path="/reservations" element={<Reservations />} />
                    <Route path="/realisations" element={<Realisations />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/formations" element={<Formations />} />
                    <Route path="/Formations" element={<Navigate to="/formations" replace />} />
                    <Route path="/a-propos" element={<About />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/comment-bien-senregistrer-en-studio" element={<BlogArticleRecordingTips />} />
                    <Route path="/experts" element={<Experts />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<Home />} />
                </Routes>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default AppRoutes;
