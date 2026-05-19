import { useEffect, useState } from "react";

import ReservationCard from "../components/ReservationCard";

import "../styles/reservations.css";

import type { Service } from "../interfaces/Service";


function Reservations() {

    const [services, setServices] = useState<Service[]>([]);



    useEffect(() => {

        fetch("http://127.0.0.1:8000/services/")

            .then((response) => response.json())

            .then((data) => {

                setServices(data);

            })

            .catch((error) => {

                console.log(error);

            });

    }, []);



    return (

        <div className="reservations-page">

            <h1 className="reservations-title">

                Réserver une session

            </h1>



            <div className="reservations-grid">

                {services.map((service) => (


                    service.tarifs.map((tarif) => (

                        <ReservationCard

                            key={tarif.id}

                            service={service.nomService}

                            tarif={tarif.nomTarif}

                            prix={tarif.prix}

                            duree="2h"

                        />

                    ))

                ))}

            </div>

        </div>
    );
}

export default Reservations;