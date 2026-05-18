import "../styles/hero.css"

function Hero() {

    return (

        <section className="hero">

            <div className="hero-content">

                <h1 className="hero-title">

                    L’ART DU SON.

                    <br />

                    <span>RÉINVENTÉ.</span>

                </h1>

                <p className="hero-description">

                    Mix, mastering et production audio
                    <br />
                    pour artistes ambitieux.

                </p>
                <div className="hero-buttons-container">

                    <button className="hero-primary-btn">

                        <span>🗓</span>

                        RÉSERVER MAINTENANT

                    </button>

                    <button className="hero-secondary-btn">

                        <span>▶</span>

                        DÉCOUVRIR LES SERVICES

                    </button>

                </div>
            </div>

        </section>
    )
}

export default Hero