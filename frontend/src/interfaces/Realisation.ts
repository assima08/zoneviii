export interface Realisation {
    id: number;

    titre: string;

    description: string;

    expert: number | null;

    expert_nom?: string | null;

    services: number[];

    services_noms: string[];

    categorie?: string | null;

    image?: string | null;

    image_url?: string | null;

    lien?: string | null;

    date_realisation?: string | null;

    est_publiee: boolean;

    created_at: string;
}