import { useEffect, useState } from "react";
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

                        <h2>

                            {service.nomService}

                        </h2>

                        <p>

                            {service.description}

                        </p>

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

                    </div>
                ))}

            </div>

        </div>
    );
}

export default Services;