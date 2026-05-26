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
                    Mix, mastering et production audio
                    <br />
                    pour artistes ambitieux.
                </p>

                <div className="hero-buttons-container">
                    <button
                        className="hero-primary-btn"
                        onClick={() => navigate("/reservations")}
                        type="button"
                    >
                        <span aria-hidden="true">+</span>
                        RESERVER MAINTENANT
                    </button>

                    <button
                        className="hero-secondary-btn"
                        onClick={() => navigate("/services")}
                        type="button"
                    >
                        <span aria-hidden="true">play</span>
                        DECOUVRIR LES SERVICES
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Hero;
