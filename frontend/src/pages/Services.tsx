import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Service } from "../interfaces/Service";
import { getApiErrorMessage, getServices } from "../services/api";
import "../styles/service.css";

function Services() {
    const navigate = useNavigate();
    const [services, setServices] = useState<Service[]>([]);
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

    return (
        <div className="services-page">
            <h1 className="services-title">NOS SERVICES</h1>

            <div className="services-grid">
                {loading && (
                    <p className="page-state">Chargement des services...</p>
                )}

                {errorMessage && (
                    <p className="page-state page-state-error">{errorMessage}</p>
                )}

                {!loading && !errorMessage && services.map((service) => (
                    <div
                        key={service.id}
                        className="service-card"
                    >
                        <div className="service-header">
                            <div className="service-icon">ST</div>
                            <h2>{service.nomService}</h2>
                        </div>

                        <p>{service.description}</p>

                        <div className="service-features">
                            <span>Haute qualite audio</span>
                            <span>Livraison rapide</span>
                            <span>Revisions incluses</span>
                        </div>

                        <div className="tarifs-container">
                            {service.tarifs.map((tarif) => (
                                <div
                                    key={tarif.id}
                                    className="tarif-item"
                                >
                                    <span>{tarif.nomTarif}</span>
                                    <strong>{tarif.prix}$</strong>
                                </div>
                            ))}
                        </div>

                        <button
                            className="service-button"
                            onClick={() =>
                                navigate(
                                    "/reservations",
                                    {
                                        state: {
                                            service: service.nomService,
                                        },
                                    },
                                )
                            }
                        >
                            Reserver maintenant
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Services;
