import type { Tarif } from "./Tarif";


export interface Service {

    id: number;

    nomService: string;

    description: string;

    tarifs: Tarif[];
}