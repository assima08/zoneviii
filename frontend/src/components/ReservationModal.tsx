import { useState } from "react";

import type { Tarif } from "../interfaces/Tarif";
import { createReservation, getApiErrorMessage } from "../services/api";
import "../styles/ReservationModal.css";

interface ReservationModalProps {
    tarif: Tarif | null;
    onClose: () => void;
}

type TimeSlot = {
    start: string;
    end: string;
    label: string;
    duration: string;
};

const timeSlots: TimeSlot[] = [
    {
        start: "11:00",
        end: "14:00",
        label: "11:00 - 14:00",
        duration: "03:00:00",
    },
    {
        start: "14:00",
        end: "17:00",
        label: "14:00 - 17:00",
        duration: "03:00:00",
    },
    {
        start: "17:00",
        end: "20:00",
        label: "17:00 - 20:00",
        duration: "03:00:00",
    },
    {
        start: "20:00",
        end: "23:00",
        label: "20:00 - 23:00",
        duration: "03:00:00",
    },
];

function ReservationModal({
                              tarif,
                              onClose,
                          }: ReservationModalProps) {
    const [nomClient, setNomClient] = useState("");
    const [prenomClient, setPrenomClient] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [date, setDate] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleReservation() {
        if (!tarif) {
            setErrorMessage("Aucun tarif sélectionné.");
            return;
        }

        if (!nomClient.trim()) {
            setErrorMessage("Veuillez entrer votre nom.");
            return;
        }

        if (!prenomClient.trim()) {
            setErrorMessage("Veuillez entrer votre prénom.");
            return;
        }

        if (!email.trim()) {
            setErrorMessage("Veuillez entrer votre email.");
            return;
        }

        if (!telephone.trim()) {
            setErrorMessage("Veuillez entrer votre téléphone.");
            return;
        }

        if (!date) {
            setErrorMessage("Veuillez choisir une date.");
            return;
        }

        if (!selectedTimeSlot) {
            setErrorMessage("Veuillez choisir un créneau horaire.");
            return;
        }

        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            await createReservation({
                nomClient,
                prenomClient,
                email,
                telephone,
                date,
                heure: selectedTimeSlot.start,
                duree: selectedTimeSlot.duration,
                tarif: tarif.id,
            });

            setSuccessMessage("Réservation confirmée.");

            window.setTimeout(() => {
                onClose();
            }, 1500);
        }
        catch (error) {
            setErrorMessage(getApiErrorMessage(error));
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="reservation-modal">
                <button
                    className="close-button"
                    onClick={onClose}
                    type="button"
                    aria-label="Fermer la fenêtre de réservation"
                >
                    ×
                </button>

                <h2>
                    Réserver une
                    <br />
                    session
                </h2>

                <div className="selected-tarif">
                    <span>{tarif?.nomTarif}</span>
                    <strong>{tarif?.prix}$</strong>
                </div>

                <div className="modal-form">
                    <input
                        type="text"
                        placeholder="Nom"
                        value={nomClient}
                        onChange={(event) => setNomClient(event.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Prénom"
                        value={prenomClient}
                        onChange={(event) => setPrenomClient(event.target.value)}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />

                    <input
                        type="tel"
                        placeholder="Téléphone"
                        value={telephone}
                        onChange={(event) => setTelephone(event.target.value)}
                        required
                    />

                    <input
                        type="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        required
                    />

                    <div className="reservation-time-section">
                        <p className="reservation-time-label">
                            Choisir un créneau horaire
                        </p>

                        <div className="reservation-time-slots">
                            {timeSlots.map((slot) => {
                                const isSelected = selectedTimeSlot?.start === slot.start;

                                return (
                                    <button
                                        key={slot.start}
                                        type="button"
                                        className={`reservation-time-slot ${isSelected ? "selected" : ""}`}
                                        onClick={() => setSelectedTimeSlot(slot)}
                                    >
                                        <span>{slot.label}</span>
                                        <small>Bloc de 3h</small>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {errorMessage && (
                        <p className="reservation-error">{errorMessage}</p>
                    )}

                    {successMessage && (
                        <p className="reservation-success">{successMessage}</p>
                    )}

                    <button
                        className="confirm-button"
                        onClick={handleReservation}
                        disabled={loading}
                        type="button"
                    >
                        {loading ? "Chargement..." : "Confirmer la réservation"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReservationModal;