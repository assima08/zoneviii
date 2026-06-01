import { useEffect, useMemo, useState } from "react";

import type { Realisation } from "../interfaces/Realisation";

import { API_BASE_URL } from "../services/api";

import "../styles/realisations.css";

function Realisations() {

    const [realisations, setRealisations] =
        useState<Realisation[]>([]);

    const [selectedCategory, setSelectedCategory] =
        useState("Tous");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        async function fetchRealisations() {

            try {

                setLoading(true);

                const response = await fetch(`${API_BASE_URL}/api/realisations/`.replace('/api/api/', '/api/'));

                if (!response.ok) {

                    throw new Error(
                        "Impossible de charger les réalisations."
                    );
                }

                const data: Realisation[] =
                    await response.json();

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

        return [
            "Tous",
            ...Array.from(new Set(apiCategories))
        ];

    }, [realisations]);

    const filteredRealisations = useMemo(() => {

        if (selectedCategory === "Tous") {

            return realisations;
        }

        return realisations.filter(
            (realisation) =>
                realisation.categorie === selectedCategory
        );

    }, [realisations, selectedCategory]);

    return (

        <main className="realisations-page">

            <section className="realisations-hero">

                <span className="realisations-eyebrow">

                    Portfolio ZoneVIII

                </span>

                <h1>

                    Nos réalisations

                </h1>

                <p>

                    Découvrez une sélection de projets passés par ZoneVIII :
                    mix, mastering, production, podcast, beatmaking et
                    accompagnement créatif.

                </p>

            </section>

            <section className="realisations-filters">

                {categories.map((category) => (

                    <button
                        key={category}
                        className={
                            selectedCategory === category
                                ? "filter-button active"
                                : "filter-button"
                        }
                        onClick={() =>
                            setSelectedCategory(category)
                        }
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

            <section className="realisations-grid">

                {filteredRealisations.map((realisation) => (

                    <article
                        key={realisation.id}
                        className="realisation-card"
                    >

                        <div className="realisation-image-wrapper">

                            {realisation.image_url ? (

                                <img
                                    src={realisation.image_url}
                                    alt={realisation.titre}
                                    className="realisation-image"
                                    loading="lazy"
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
                                >

                                    Voir le projet

                                </a>
                            )}

                        </div>

                    </article>
                ))}

            </section>

        </main>
    );
}

export default Realisations;