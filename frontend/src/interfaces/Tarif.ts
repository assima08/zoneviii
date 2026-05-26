export interface Tarif {

    id: number;

    nomTarif: string;

    typeTarif: "heure" | "forfait";

    prix: string;

    service?: number;
}
