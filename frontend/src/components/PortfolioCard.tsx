import type { Portfolio, PortfolioPhoto } from "../interfaces/Portfolio";

type PortfolioCardProps = {
    portfolio: Portfolio;
    onOpenPhoto: (portfolio: Portfolio, photoIndex: number) => void;
};

function getPhotoUrl(photo?: PortfolioPhoto | null) {
    return photo?.photo_url || photo?.photo || "";
}

function PortfolioCard({ portfolio, onOpenPhoto }: PortfolioCardProps) {
    const mainPhoto = portfolio.photos[0];
    const mainImageUrl = portfolio.image_principale || getPhotoUrl(mainPhoto);
    const visiblePhotos = portfolio.photos.slice(0, 5);
    const remainingPhotos = Math.max(portfolio.photos.length - visiblePhotos.length, 0);
    const formattedDate = portfolio.date_shooting
        ? new Intl.DateTimeFormat("fr-CA", {
            month: "long",
            year: "numeric",
        }).format(new Date(`${portfolio.date_shooting}T00:00:00`))
        : "";

    return (
        <article className="portfolio-card">
            <button
                className="portfolio-main-image"
                type="button"
                aria-label={`Ouvrir la galerie ${portfolio.titre}`}
                onClick={() => mainPhoto && onOpenPhoto(portfolio, 0)}
                disabled={!mainPhoto}
            >
                {mainImageUrl ? (
                    <img
                        src={mainImageUrl}
                        alt={`${portfolio.titre} - image principale photoshoot ZooneVIII`}
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    <span>ZVIII</span>
                )}
            </button>

            <div className="portfolio-card-content">
                <div className="portfolio-card-heading">
                    {formattedDate && (
                        <span>{formattedDate}</span>
                    )}

                    <h2>{portfolio.titre}</h2>
                </div>

                {portfolio.description && (
                    <p>{portfolio.description}</p>
                )}

                {visiblePhotos.length > 0 && (
                    <div className="portfolio-thumbs" aria-label={`Photos de ${portfolio.titre}`}>
                        {visiblePhotos.map((photo, index) => {
                            const photoUrl = getPhotoUrl(photo);

                            return (
                                <button
                                    key={photo.id}
                                    className="portfolio-thumb"
                                    type="button"
                                    aria-label={`Voir ${photo.titre || `photo ${index + 1}`}`}
                                    onClick={() => onOpenPhoto(portfolio, index)}
                                >
                                    {photoUrl ? (
                                        <img
                                            src={photoUrl}
                                            alt={`${photo.titre || portfolio.titre} - photoshoot ZooneVIII`}
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    ) : (
                                        <span>{index + 1}</span>
                                    )}

                                    {index === visiblePhotos.length - 1 && remainingPhotos > 0 && (
                                        <span className="portfolio-thumb-more">
                                            +{remainingPhotos}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </article>
    );
}

export default PortfolioCard;
