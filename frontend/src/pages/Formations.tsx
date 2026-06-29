import { Link } from "react-router-dom";

import "../styles/editorial.css";

const formations = [
    "Formation production musicale a Quebec",
    "Formation beatmaking a Quebec",
    "Formation mix a Quebec",
    "Enregistrement vocal et direction de session",
    "Bases du mastering et finition audio",
    "Creation audio pour artistes, podcasteurs et createurs",
];

function Formations() {
    return (
        <main className="editorial-page">
            <section className="editorial-hero">
                <span>Formations audio</span>
                <h1>NOS FORMATIONS</h1>
                <p>
                    ZooneVIII propose des formations audio a Quebec pour les
                    artistes, producteurs, beatmakers et createurs qui veulent
                    comprendre, produire et finaliser un son professionnel.
                </p>
            </section>

            <section className="editorial-grid">
                {formations.map((formation) => (
                    <article key={formation}>
                        <h2>{formation}</h2>
                        <p>
                            Une approche pratique pour progresser avec methode :
                            ecoute, outils, structure de projet, workflow studio
                            et accompagnement adapte a votre niveau.
                        </p>
                    </article>
                ))}
            </section>

            <section className="editorial-cta">
                <div>
                    <h2>Construire ton son avec une methode claire</h2>
                    <p>
                        Contactez ZooneVIII pour choisir une formation audio, une
                        formation beatmaking ou une formation mix adaptee a votre
                        projet.
                    </p>
                </div>

                <div className="editorial-actions">
                    <Link to="/contact">Demander une formation</Link>
                    <Link to="/tarifs">Voir les tarifs</Link>
                </div>
            </section>
        </main>
    );
}

export default Formations;
