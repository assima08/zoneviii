import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

import type { Expert } from "../interfaces/Expert";
import { API_BASE_URL, getApiErrorMessage, getExperts } from "../services/api";
import "../styles/experts.css";

function Experts() {
    const [experts, setExperts] = useState<Expert[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [failedImageIds, setFailedImageIds] = useState<Set<number>>(new Set());

    useEffect(() => {
        let isMounted = true;

        async function loadExperts() {
            try {
                const data = await getExperts();

                if (isMounted) {
                    setExperts(data);
                }
            }
            catch (error) {
                if (isMounted) {
                    setErrorMessage(getApiErrorMessage(error));
                }
            }
            finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadExperts();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <main className="experts-page">
            <section className="experts-hero">
                <p>NOS EXPERTS</p>
                <h1>Un collectif sonore pour pousser chaque detail.</h1>
                <span>
                    Direction artistique, prise de voix, mix, mastering et
                    identite audio: ZoneVIII rassemble des profils precis,
                    creatifs et exigeants.
                </span>
            </section>

            {loading && (
                <section className="experts-grid">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <article
                            className="expert-card expert-card-skeleton"
                            key={index}
                        >
                            <div />
                            <span />
                            <strong />
                            <p />
                        </article>
                    ))}
                </section>
            )}

            {errorMessage && (
                <section className="experts-empty experts-error">
                    <h2>Impossible de charger les experts.</h2>
                    <p>{errorMessage}</p>
                </section>
            )}

            {!loading && !errorMessage && experts.length === 0 && (
                <section className="experts-empty">
                    <h2>Les experts arrivent bientot.</h2>
                    <p>
                        Ajoute les profils depuis Django Admin pour les afficher
                        automatiquement sur cette page.
                    </p>
                </section>
            )}

            {!loading && !errorMessage && experts.length > 0 && (
                <section className="experts-grid">
                    {experts.map((expert, index) => (
                        <ExpertCard
                            expert={expert}
                            hasImageError={failedImageIds.has(expert.id)}
                            key={expert.id}
                            onImageError={() =>
                                setFailedImageIds((currentIds) => {
                                    const nextIds = new Set(currentIds);
                                    nextIds.add(expert.id);
                                    return nextIds;
                                })
                            }
                            style={{ animationDelay: `${index * 80}ms` }}
                        />
                    ))}
                </section>
            )}
        </main>
    );
}

interface ExpertCardProps {
    expert: Expert;
    hasImageError: boolean;
    onImageError: () => void;
    style: CSSProperties;
}

function ExpertCard({
    expert,
    hasImageError,
    onImageError,
    style,
}: ExpertCardProps) {
    const imageUrl = resolveExpertImageUrl(expert);
    const shouldShowImage = imageUrl && !hasImageError;

    return (
        <article
            className="expert-card"
            style={style}
        >
            <div className="expert-image-wrap">
                {shouldShowImage ? (
                    <img
                        src={imageUrl}
                        alt={`Portrait de ${expert.nomExpert}, ${expert.role || "expert ZoneVIII"}`}
                        loading="lazy"
                        decoding="async"
                        onError={onImageError}
                    />
                ) : (
                    <div className="expert-image-fallback">
                        <span>{getInitials(expert.nomExpert)}</span>
                    </div>
                )}
            </div>

            <div className="expert-content">
                <span>{expert.specialite || "ZoneVIII Studio"}</span>
                <h2>{expert.nomExpert}</h2>
                <strong>{expert.role || "Expert audio"}</strong>
                <p>
                    {expert.description || "Profil expert en cours de mise a jour."}
                </p>

                {expert.instagram && (
                    <a
                        href={expert.instagram}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Voir le profil Instagram de ${expert.nomExpert}`}
                    >
                        Instagram
                    </a>
                )}
            </div>
        </article>
    );
}

function resolveExpertImageUrl(expert: Expert) {
    const rawUrl = expert.imageUrl || expert.image || expert.photo;

    if (!rawUrl) {
        return "";
    }

    if (rawUrl.startsWith("http://") || rawUrl.startsWith("https://")) {
        return rawUrl;
    }

    return new URL(rawUrl, API_BASE_URL).toString();
}

function getInitials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

export default Experts;
