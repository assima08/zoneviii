import { Link } from "react-router-dom";

import "../styles/editorial.css";

function About() {
    return (
        <main className="editorial-page">
            <section className="editorial-hero">
                <span>Le studio</span>
                <h1>ZoneVIII, studio creatif a Quebec</h1>
                <p>
                    ZoneVIII est un studio creatif situe a Quebec, concu pour les
                    artistes, producteurs, createurs de contenu et entrepreneurs
                    qui veulent donner vie a leurs projets audio dans un
                    environnement professionnel.
                </p>
            </section>

            <section className="editorial-grid">
                <article>
                    <h2>Qui sommes-nous ?</h2>
                    <p>
                        ZoneVIII est un studio d'enregistrement a Quebec qui
                        accompagne les artistes et createurs dans toutes les
                        etapes de leur projet audio : idee, enregistrement,
                        production musicale, mixage, mastering et publication.
                    </p>
                </article>

                <article>
                    <h2>Ce que nous faisons</h2>
                    <p>
                        Le studio couvre l'enregistrement vocal, le mix, le
                        mastering, le beatmaking, la production musicale, le
                        podcast, les formations audio et l'accompagnement
                        artistique.
                    </p>
                </article>

                <article>
                    <h2>Pour qui ?</h2>
                    <p>
                        ZoneVIII s'adresse aux artistes, producteurs, beatmakers,
                        podcasteurs, entrepreneurs, marques et createurs de
                        contenu qui veulent produire un son professionnel a
                        Quebec.
                    </p>
                </article>

                <article>
                    <h2>Notre approche</h2>
                    <p>
                        Chaque projet est traite avec une direction claire :
                        comprendre l'univers, structurer la session, affiner le
                        son et livrer une experience efficace, premium et humaine.
                    </p>
                </article>

                <article>
                    <h2>Pourquoi choisir ZoneVIII ?</h2>
                    <p>
                        Le studio combine une culture musicale actuelle, une
                        methode professionnelle et un environnement sombre,
                        precis et inspire pour enregistrer, produire, mixer et
                        former.
                    </p>
                </article>

                <article>
                    <h2>Formations audio a Quebec</h2>
                    <p>
                        ZoneVIII propose aussi des formations en production
                        musicale, formation beatmaking, formation mix,
                        enregistrement vocal et creation audio pour progresser
                        avec des bases solides.
                    </p>
                </article>
            </section>

            <section className="editorial-cta">
                <div>
                    <h2>Un projet audio a concretiser ?</h2>
                    <p>
                        Reservez une session studio a Quebec ou contactez-nous
                        pour parler de votre morceau, podcast, EP, album ou
                        formation.
                    </p>
                </div>

                <div className="editorial-actions">
                    <Link to="/reservations">Reserver une session</Link>
                    <Link to="/contact">Nous contacter</Link>
                </div>
            </section>
        </main>
    );
}

export default About;
