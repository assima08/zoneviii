import { useState } from "react";

import type { Tarif } from "../interfaces/Tarif";
import { createReservation, getApiErrorMessage } from "../services/api";
import "../styles/ReservationModal.css";

interface ReservationModalProps {
    tarif: Tarif | null;
    onClose: () => void;
}

function ReservationModal({
    tarif,
    onClose,
}: ReservationModalProps) {
    const [nomClient, setNomClient] = useState("");
    const [prenomClient, setPrenomClient] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [date, setDate] = useState("");
    const [heure, setHeure] = useState("");
    const [duree, setDuree] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleReservation() {
        if (!tarif) {
            setErrorMessage("Aucun tarif selectionne.");
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
                heure,
                duree: normalizeDuration(duree),
                tarif: tarif.id,
            });

            setSuccessMessage("Reservation confirmee.");

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
                >
                    x
                </button>

                <h2>
                    Reserver une
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
                        placeholder="Prenom"
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
                        placeholder="Telephone"
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

                    <input
                        type="time"
                        value={heure}
                        onChange={(event) => setHeure(event.target.value)}
                        required
                    />

                    <input
                        type="time"
                        value={duree}
                        onChange={(event) => setDuree(event.target.value)}
                        placeholder="Duree"
                        required
                    />

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
                        {loading ? "Chargement..." : "Confirmer la reservation"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function normalizeDuration(duration: string) {
    if (!duration) {
        return duration;
    }

    const parts = duration.split(":");

    if (parts.length === 2) {
        return `${parts[0]}:${parts[1]}:00`;
    }

    return duration;
}

export default ReservationModal;
