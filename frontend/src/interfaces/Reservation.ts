import type { Client } from "./Client";
import type { Tarif } from "./Tarif";

export interface Reservation {
    id: number;
    date: string;
    heure: string;
    duree: string;
    client: Client;
    tarif: Tarif;
    statut: "attente" | "confirme" | "decline";
}

export interface ReservationCreatePayload {
    nomClient: string;
    prenomClient: string;
    email: string;
    telephone: string;
    date: string;
    heure: string;
    duree: string;
    tarif: number;
}
