import { useEffect, useMemo, useState } from "react";

import type { Realisation } from "../interfaces/Realisation";
import { getRealisations, resolveMediaUrl } from "../services/api";

import "../styles/realisations.css";

function Realisations() {
    const [realisations, setRealisations] = useState<Realisation[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("Tous");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchRealisations() {
            try {
                setLoading(true);
                setError("");

                const data = await getRealisations();

                setRealisations(data);
            } catch (error) {
                console.error(error);

                setError(
                    "Une erreur est survenue pendant le chargement des réalisations."
                );
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
                        Nos réalisations
                    </span>

                    <h1>
                        Nos réalisations
                    </h1>
                </div>

                <p>
                    Découvrez une sélection de projets mixés, produits et
                    accompagnés par ZoneVIII. Chaque réalisation reflète notre
                    exigence sonore et notre vision créative.
                </p>
            </section>

            <section className="realisations-filters">
                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        className={
                            selectedCategory === category
                                ? "filter-button active"
                                : "filter-button"
                        }
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </section>

            {loading && (
                <p className="realisations-status">
                    Chargement des réalisations...
                </p>
            )}

            {error && (
                <p className="realisations-error">
                    {error}
                </p>
            )}

            {!loading && !error && filteredRealisations.length === 0 && (
                <p className="realisations-status">
                    Aucune réalisation disponible pour le moment.
                </p>
            )}

            {!loading && !error && filteredRealisations.length > 0 && (
                <section className="realisations-grid">
                    {filteredRealisations.map((realisation) => {
                        const imageUrl = resolveMediaUrl(realisation.image_url || realisation.image);

                        return (
                            <article
                                key={realisation.id}
                                className="realisation-card"
                            >
                                <div className="realisation-image-wrapper">
                                    {imageUrl ? (
                                        <img
                                            src={imageUrl}
                                            alt={realisation.titre}
                                            className="realisation-image"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    ) : (
                                        <div className="realisation-image-placeholder">
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
                        Vous avez un projet à concrétiser ?
                    </h2>

                    <p>
                        Réservez une session ou contactez-nous pour discuter de
                        votre vision. Ensemble, donnons vie à votre son.
                    </p>
                </div>

                <div className="realisations-cta-actions">
                    <a
                        href="/reservations"
                        className="primary"
                    >
                        Réserver une session →
                    </a>

                    <a
                        href="/contact"
                        className="secondary"
                    >
                        Nous contacter →
                    </a>
                </div>
            </section>
        </main>
    );
}

export default Realisations;
