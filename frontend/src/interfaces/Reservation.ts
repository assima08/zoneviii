import type {Client} from "./Client.ts";
import type {Tarif} from "./Tarif.ts";

export interface Reservation {

    id: number;

    dateReservation: string;

    heureReservation: string;

    client: Client;

    tarif: Tarif;
}
