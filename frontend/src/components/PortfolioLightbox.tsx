import { useEffect } from "react";

import type { PortfolioPhoto } from "../interfaces/Portfolio";

type PortfolioLightboxProps = {
    photos: PortfolioPhoto[];
    activeIndex: number;
    portfolioTitle: string;
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
};

function getPhotoUrl(photo: PortfolioPhoto) {
    return photo.photo_url || photo.photo || "";
}

function PortfolioLightbox({
    photos,
    activeIndex,
    portfolioTitle,
    onClose,
    onPrevious,
    onNext,
}: PortfolioLightboxProps) {
    const activePhoto = photos[activeIndex];

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }

            if (event.key === "ArrowLeft") {
                onPrevious();
            }

            if (event.key === "ArrowRight") {
                onNext();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        document.body.classList.add("portfolio-lightbox-open");

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.classList.remove("portfolio-lightbox-open");
        };
    }, [onClose, onNext, onPrevious]);

    if (!activePhoto) {
        return null;
    }

    const imageUrl = getPhotoUrl(activePhoto);
    const imageAlt = `${activePhoto.titre || portfolioTitle} - Portfolio photoshoot ZooneVIII`;

    return (
        <div
            className="portfolio-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${activeIndex + 1} de ${portfolioTitle}`}
        >
            <button
                className="portfolio-lightbox-backdrop"
                type="button"
                aria-label="Fermer la galerie"
                onClick={onClose}
            />

            <div className="portfolio-lightbox-frame">
                <button
                    className="portfolio-lightbox-close"
                    type="button"
                    aria-label="Fermer"
                    onClick={onClose}
                >
                    x
                </button>

                <button
                    className="portfolio-lightbox-nav portfolio-lightbox-prev"
                    type="button"
                    aria-label="Photo precedente"
                    onClick={onPrevious}
                >
                    &lsaquo;
                </button>

                <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="portfolio-lightbox-image"
                    decoding="async"
                />

                <button
                    className="portfolio-lightbox-nav portfolio-lightbox-next"
                    type="button"
                    aria-label="Photo suivante"
                    onClick={onNext}
                >
                    &rsaquo;
                </button>

                <div className="portfolio-lightbox-caption">
                    <span>{portfolioTitle}</span>
                    <strong>{activePhoto.titre}</strong>
                    <small>
                        {activeIndex + 1} / {photos.length}
                    </small>
                </div>
            </div>
        </div>
    );
}

export default PortfolioLightbox;
