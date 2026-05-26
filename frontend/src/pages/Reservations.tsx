import { useEffect, useState } from "react";

import ReservationCard from "../components/ReservationCard";
import ReservationModal from "../components/ReservationModal";
import type { Service } from "../interfaces/Service";
import type { Tarif } from "../interfaces/Tarif";
import { getApiErrorMessage, getServices } from "../services/api";
import "../styles/reservations.css";

function Reservations() {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedTarif, setSelectedTarif] = useState<Tarif | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadServices() {
            try {
                const data = await getServices();

                if (isMounted) {
                    setServices(data);
                }
            }
            catch (error) {
                if (isMounted) {
                    setErrorMessage(getApiErrorMessage(error));
                }
            }
            finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadServices();

        return () => {
            isMounted = false;
        };
    }, []);

    function openModal(tarif: Tarif) {
        setSelectedTarif(tarif);
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
        setSelectedTarif(null);
    }

    return (
        <div className="reservations-page">
            <h1 className="reservations-title">Reserver une session</h1>

            {loading && (
                <p className="reservations-state">Chargement des sessions...</p>
            )}

            {errorMessage && (
                <p className="reservations-state reservations-state-error">
                    {errorMessage}
                </p>
            )}

            <div className="reservations-grid">
                {!loading && !errorMessage && services.flatMap((service) =>
                    service.tarifs.map((tarif) => (
                        <ReservationCard
                            key={tarif.id}
                            service={service.nomService}
                            tarif={tarif.nomTarif}
                            prix={tarif.prix}
                            duree={tarif.typeTarif === "heure" ? "1h" : "Forfait"}
                            onReserve={() => openModal(tarif)}
                        />
                    )),
                )}
            </div>

            {showModal && (
                <ReservationModal
                    tarif={selectedTarif}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}

export default Reservations;
