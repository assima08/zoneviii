import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import "../styles/service.css";

interface Tarif {

    id: number;

    nomTarif: string;

    prix: string;

    typeTarif: string;
}

interface Service {

    id: number;

    nomService: string;

    description: string;

    tarifs: Tarif[];
}

function Services() {
    const navigate = useNavigate();

    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {

        fetch("http://127.0.0.1:8000/services/")

            .then((response) => response.json())

            .then((data) => setServices(data))

            .catch((error) => console.error(error));

    }, []);

    return (

        <div className="services-page">

            <h1 className="services-title">

                NOS SERVICES

            </h1>

            <div className="services-grid">

                {services.map((service) => (

                    <div
                        key={service.id}
                        className="service-card"
                    >

                        <div className="service-header">

                            <div className="service-icon">

                                🎚

                            </div>

                            <h2>

                                {service.nomService}

                            </h2>

                        </div>

                        <p>

                            {service.description}

                        </p>

                        <div className="service-features">

                            <span>

                                ✓ Haute qualité audio

                            </span>

                            <span>

                                ✓ Livraison rapide

                            </span>

                            <span>

                                ✓ Révisions incluses

                            </span>

                        </div>

                        <div className="tarifs-container">

                            {service.tarifs.map((tarif) => (

                                <div
                                    key={tarif.id}
                                    className="tarif-item"
                                >

                                    <span>

                                        {tarif.nomTarif}

                                    </span>

                                    <strong>

                                        {tarif.prix}$

                                    </strong>

                                </div>

                            ))}

                        </div>

                        <button className="service-button" onClick={() =>
                            navigate(
                                "/reservations",
                                {
                                    state: {
                                        service: service.nomService
                                    }
                                }
                            )
                        }>

                            Réserver maintenant

                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Services;