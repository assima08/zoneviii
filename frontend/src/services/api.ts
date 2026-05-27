import axios from "axios";

import type { ContactMessagePayload } from "../interfaces/ContactMessage";
import type { Expert } from "../interfaces/Expert";
import type { Service } from "../interfaces/Service";
import type { ReservationCreatePayload } from "../interfaces/Reservation";
import type { Tarif } from "../interfaces/Tarif";

export const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_URL is not configured.");
}

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 15000,
});

export async function getServices() {
    const response = await api.get<Service[]>("/services/");
    return response.data;
}

export async function getTarifs() {
    const response = await api.get<Tarif[]>("/tarifs/");
    return response.data;
}

export async function getExperts() {
    const response = await api.get<Expert[]>("/experts/");
    return response.data;
}

export async function createReservation(payload: ReservationCreatePayload) {
    const response = await api.post("/reservations/create/", payload);
    return response.data;
}

export async function sendContactMessage(payload: ContactMessagePayload) {
    const response = await api.post("/contact/", payload);
    return response.data;
}

export function getApiErrorMessage(error: unknown) {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;

        if (typeof data === "string") {
            return data;
        }

        if (data?.non_field_errors?.[0]) {
            return data.non_field_errors[0];
        }

        if (data && typeof data === "object") {
            const firstError = Object.values(data)[0];

            if (Array.isArray(firstError) && firstError[0]) {
                return String(firstError[0]);
            }
        }

        if (error.code === "ECONNABORTED") {
            return "Le serveur met trop de temps a repondre.";
        }
    }

    return "Impossible de contacter le serveur.";
}

export default api;
