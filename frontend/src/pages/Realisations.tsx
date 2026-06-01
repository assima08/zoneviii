import { useEffect, useMemo, useState } from "react";

import type { Realisation } from "../interfaces/Realisation";
import { getApiErrorMessage, getRealisations } from "../services/api";

import "../styles/realisations.css";

function Realisations() {
    const [realisations, setRealisations] = useState<Realisation[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("Tous");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [brokenImages, setBrokenImages] = useState<number[]>([]);

    useEffect(() => {
        async function fetchRealisations() {
            try {
                setLoading(true);
                setError("");

                const data = await getRealisations();

                setRealisations(data);
            } catch (requestError) {
                setError(getApiErrorMessage(requestError));
            } finally {
                setLoading(false);
            }
        }

        fetchRealisations();
    }, []);

    const categories = useMemo(() => {
        const apiCategories = realisations
            .map((realisation) => realisation.categorie)
            .filter(Boolean) as string[];

        return ["Tous", ...Array.from(new Set(apiCategories))];
    }, [realisations]);

    const filteredRealisations = useMemo(() => {
        if (selectedCategory === "Tous") {
            return realisations;
        }

        return realisations.filter(
            (realisation) => realisation.categorie === selectedCategory
        );
    }, [realisations, selectedCategory]);

    return (
        <main className="realisations-page">
            <section className="realisations-hero">
                <div className="realisations-hero-content">
                    <span className="realisations-eyebrow">
                        Portfolio ZoneVIII
                    </span>

                    <h1>
                        Nos realisations
                    </h1>
                </div>

                <p>
                    Decouvrez une selection de projets mixes, produits et
                    accompagnes par ZoneVIII. Chaque realisation reflete notre
                    exigence sonore et notre vision creative.
                </p>
            </section>

            <section className="realisations-filters" aria-label="Filtrer les realisations">
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        className={
                            selectedCategory === category
                                ? "filter-button active"
                                : "filter-button"
                        }
                        aria-pressed={selectedCategory === category}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </section>

            {loading && (
                <p className="realisations-status">
                    Chargement des realisations...
                </p>
            )}

            {error && (
                <p className="realisations-error">
                    {error}
                </p>
            )}

            {!loading && !error && filteredRealisations.length === 0 && (
                <p className="realisations-status">
                    Aucune realisation disponible pour le moment.
                </p>
            )}

            {!loading && !error && filteredRealisations.length > 0 && (
                <section className="realisations-grid" aria-label="Liste des realisations ZoneVIII">
                    {filteredRealisations.map((realisation) => {
                        return (
                            <article
                                key={realisation.id}
                                className="realisation-card"
                            >
                                <div className="realisation-image-wrapper">
                                    {realisation.image_url && !brokenImages.includes(realisation.id) ? (
                                        <img
                                            src={realisation.image_url}
                                            alt={realisation.titre}
                                            className="realisation-image"
                                            loading="lazy"
                                            decoding="async"
                                            onError={() =>
                                                setBrokenImages((previous) =>
                                                    previous.includes(realisation.id)
                                                        ? previous
                                                        : [...previous, realisation.id]
                                                )
                                            }
                                        />
                                    ) : (
                                        <div
                                            className="realisation-image-placeholder"
                                            aria-label={`Image indisponible pour ${realisation.titre}`}
                                            role="img"
                                        >
                                            ZVIII
                                        </div>
                                    )}

                                    {realisation.categorie && (
                                        <span className="realisation-category">
                                            {realisation.categorie}
                                        </span>
                                    )}
                                </div>

                                <div className="realisation-content">
                                    <h2>
                                        {realisation.titre}
                                    </h2>

                                    <p>
                                        {realisation.description}
                                    </p>

                                    {realisation.expert_nom && (
                                        <span className="realisation-expert">
                                            Expert : {realisation.expert_nom}
                                        </span>
                                    )}

                                    {realisation.services_noms.length > 0 && (
                                        <div className="realisation-services">
                                            {realisation.services_noms.map(
                                                (service) => (
                                                    <span key={service}>
                                                        {service}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    )}

                                    {realisation.lien && (
                                        <a
                                            href={realisation.lien}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="realisation-link"
                                            aria-label={`Voir le projet ${realisation.titre}`}
                                        >
                                            Voir le projet
                                        </a>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </section>
            )}

            <section className="realisations-cta">
                <div>
                    <h2>
                        Vous avez un projet a concretiser ?
                    </h2>

                    <p>
                        Reservez une session ou contactez-nous pour discuter de
                        votre vision. Ensemble, donnons vie a votre son.
                    </p>
                </div>

                <div className="realisations-cta-actions">
                    <a
                        href="/reservations"
                        className="primary"
                    >
                        Reserver une session
                    </a>

                    <a
                        href="/contact"
                        className="secondary"
                    >
                        Nous contacter
                    </a>
                </div>
            </section>
        </main>
    );
}

export default Realisations;
