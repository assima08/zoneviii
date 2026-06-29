import { useNavigate } from "react-router-dom";

import "../styles/hero.css";

function Hero() {
    const navigate = useNavigate();

    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">
                    L'ART DU SON.
                    <br />
                    <span>REINVENTE.</span>
                </h1>

                <p className="hero-description">
                    Studio d'enregistrement a Quebec : mix, mastering,
                    beatmaking, podcast et production audio
                    <br />
                    pour artistes ambitieux.
                </p>

                <div className="hero-buttons-container">
                    <button
                        className="hero-primary-btn"
                        aria-label="Reserver une session creative ZooneVIII"
                        onClick={() => navigate("/reservations")}
                        type="button"
                    >
                        <span aria-hidden="true">+</span>
                        RESERVER MAINTENANT
                    </button>

                    <button
                        className="hero-secondary-btn"
                        aria-label="Decouvrir les tarifs creatifs ZooneVIII"
                        onClick={() => navigate("/tarifs")}
                        type="button"
                    >
                        <span className="play-icon" aria-hidden="true">â–¶</span>
                        <span>VOIR LES TARIFS</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;
