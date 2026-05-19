import { useState } from "react";

import "../styles/ReservationModal.css";

import type { Tarif } from "../interfaces/Tarif";



interface ReservationModalProps {

    tarif: Tarif | null;

    onClose: () => void;
}



function ReservationModal({

                              tarif,

                              onClose

                          }: ReservationModalProps) {



    const [nomClient, setNomClient]
        = useState("");

    const [prenomClient, setPrenomClient]
        = useState("");

    const [email, setEmail]
        = useState("");

    const [dateReservation, setDateReservation]
        = useState("");

    const [heureReservation, setHeureReservation]
        = useState("");



    async function handleReservation() {

        const reservationData = {

            nomClient,

            prenomClient,

            email,

            dateReservation,

            heureReservation,

            tarif: tarif?.id
        };



        try {

            const response = await fetch(

                "http://127.0.0.1:8000/reservations/create/",

                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(
                        reservationData
                    )
                }
            );



            if (response.ok) {

                alert(
                    "Réservation confirmée"
                );

                onClose();
            }

            else {

                alert(
                    "Erreur lors de la réservation"
                );
            }
        }

        catch (error) {

            console.log(error);
        }
    }



    return (

        <div className="modal-overlay">

            <div className="reservation-modal">

                <button

                    className="close-button"

                    onClick={onClose}
                >

                    ×

                </button>



                <h2>

                    Réserver une session

                </h2>



                <div className="selected-tarif">

                    <span>

                        {tarif?.nomTarif}

                    </span>

                    <strong>

                        {tarif?.prix}$

                    </strong>

                </div>



                <div className="modal-form">

                    <input

                        type="text"

                        placeholder="Nom"

                        value={nomClient}

                        onChange={(e) =>
                            setNomClient(
                                e.target.value
                            )
                        }
                    />



                    <input

                        type="text"

                        placeholder="Prénom"

                        value={prenomClient}

                        onChange={(e) =>
                            setPrenomClient(
                                e.target.value
                            )
                        }
                    />



                    <input

                        type="email"

                        placeholder="Email"

                        value={email}

                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                    />



                    <input

                        type="date"

                        value={dateReservation}

                        onChange={(e) =>
                            setDateReservation(
                                e.target.value
                            )
                        }
                    />



                    <input

                        type="time"

                        value={heureReservation}

                        onChange={(e) =>
                            setHeureReservation(
                                e.target.value
                            )
                        }
                    />



                    <button

                        className="confirm-button"

                        onClick={
                            handleReservation
                        }
                    >

                        Confirmer la réservation

                    </button>

                </div>

            </div>

        </div>
    );
}



export default ReservationModal;