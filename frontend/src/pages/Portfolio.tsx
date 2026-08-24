import { useCallback, useEffect, useMemo, useState } from "react";

import PortfolioCard from "../components/PortfolioCard";
import PortfolioLightbox from "../components/PortfolioLightbox";
import type { Portfolio as PortfolioItem } from "../interfaces/Portfolio";
import { getApiErrorMessage, getPortfolios } from "../services/api";
import "../styles/portfolio.css";

type LightboxState = {
    portfolio: PortfolioItem;
    photoIndex: number;
} | null;

function Portfolio() {
    const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [lightbox, setLightbox] = useState<LightboxState>(null);

    useEffect(() => {
        let isMounted = true;

        async function loadPortfolios() {
            try {
                setLoading(true);
                setErrorMessage("");

                const data = await getPortfolios();

                if (isMounted) {
                    setPortfolios(data);
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(getApiErrorMessage(error));
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadPortfolios();

        return () => {
            isMounted = false;
        };
    }, []);

    const activePhotos = useMemo(
        () => lightbox?.portfolio.photos ?? [],
        [lightbox],
    );

    const openPhoto = useCallback((portfolio: PortfolioItem, photoIndex: number) => {
        if (portfolio.photos.length === 0) {
            return;
        }

        setLightbox({ portfolio, photoIndex });
    }, []);

    const closeLightbox = useCallback(() => {
        setLightbox(null);
    }, []);

    const showPreviousPhoto = useCallback(() => {
        setLightbox((current) => {
            if (!current) {
                return current;
            }

            const photosCount = current.portfolio.photos.length;
            const photoIndex = (current.photoIndex - 1 + photosCount) % photosCount;

            return { ...current, photoIndex };
        });
    }, []);

    const showNextPhoto = useCallback(() => {
        setLightbox((current) => {
            if (!current) {
                return current;
            }

            const photosCount = current.portfolio.photos.length;
            const photoIndex = (current.photoIndex + 1) % photosCount;

            return { ...current, photoIndex };
        });
    }, []);

    return (
        <main className="portfolio-page">
            <section className="portfolio-hero">
                <div>
                    <span className="portfolio-eyebrow">
                        Photoshoot ZooneVIII
                    </span>

                    <h1>
                        portefolio
                    </h1>
                </div>

                <p>
                    Une selection de sessions photo pensees pour l'image des
                    artistes, entrepreneurs et createurs qui veulent une
                    presence visuelle nette, premium et assumee.
                </p>
            </section>

            {loading && (
                <p className="portfolio-status">
                    Chargement du portfolio...
                </p>
            )}

            {errorMessage && (
                <p className="portfolio-error">
                    {errorMessage}
                </p>
            )}

            {!loading && !errorMessage && portfolios.length === 0 && (
                <section className="portfolio-empty">
                    <span>ZVIII</span>
                    <h2>Aucun photoshoot publie pour le moment.</h2>
                    <p>
                        Les galeries apparaitront ici des qu'elles seront
                        ajoutees depuis l'administration.
                    </p>
                </section>
            )}

            {!loading && !errorMessage && portfolios.length > 0 && (
                <section className="portfolio-grid" aria-label="Galeries photoshoot ZooneVIII">
                    {portfolios.map((portfolio) => (
                        <PortfolioCard
                            key={portfolio.id}
                            portfolio={portfolio}
                            onOpenPhoto={openPhoto}
                        />
                    ))}
                </section>
            )}

            {lightbox && (
                <PortfolioLightbox
                    photos={activePhotos}
                    activeIndex={lightbox.photoIndex}
                    portfolioTitle={lightbox.portfolio.titre}
                    onClose={closeLightbox}
                    onPrevious={showPreviousPhoto}
                    onNext={showNextPhoto}
                />
            )}
        </main>
    );
}

export default Portfolio;
