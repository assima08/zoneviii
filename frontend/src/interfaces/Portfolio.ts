export interface PortfolioPhoto {
    id: number;
    titre: string;
    photo?: string | null;
    photo_url?: string | null;
    ordre: number;
    date: string;
}

export interface Portfolio {
    id: number;
    titre: string;
    description: string;
    date_shooting?: string | null;
    est_publie: boolean;
    created_at: string;
    image_principale?: string | null;
    photos: PortfolioPhoto[];
}
