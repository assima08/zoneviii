import { useEffect, useState } from "react";

import ReservationCard from "../components/ReservationCard";

import ReservationModal from "../components/ReservationModal";

import "../styles/reservations.css";

import type { Service } from "../interfaces/Service";

import type { Tarif } from "../interfaces/Tarif";



function Reservations() {



    const [services, setServices]
        = useState<Service[]>([]);



    const [selectedTarif, setSelectedTarif]
        = useState<Tarif | null>(null);



    const [showModal, setShowModal]
        = useState(false);




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

            <h1 className="reservations-title">

                Réserver une session

            </h1>



            <div className="reservations-grid">

                {services.map((service) => (

                    service.tarifs.map((tarif) => (

                        <ReservationCard

                            key={tarif.id}

                            service={
                                service.nomService
                            }

                            tarif={
                                tarif.nomTarif
                            }

                            prix={
                                tarif.prix
                            }

                            duree="2h"

                            onReserve={() =>
                                openModal(tarif)
                            }

                        />

                    ))

                ))}

            </div>




            {

                showModal && (

                    <ReservationModal

                        tarif={selectedTarif}

                        onClose={closeModal}

                    />

                )
            }

        </div>
    );
}



export default Reservations;