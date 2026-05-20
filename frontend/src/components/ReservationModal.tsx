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

    const [date, setDate]
        = useState("");

    const [heure, setHeure]
        = useState("");

    const [duree, setDuree]
        = useState("");



    const [loading, setLoading]
        = useState(false);



    const [successMessage, setSuccessMessage]
        = useState("");



    const [errorMessage, setErrorMessage]
        = useState("");



    async function handleReservation() {



        setLoading(true);

        setErrorMessage("");

        setSuccessMessage("");



        const reservationData = {

            nomClient,

            prenomClient,

            email,

            date,

            heure,

            duree,

            tarif: tarif?.id
        };



        console.log(reservationData);



        try {

            const response = await fetch(

                "http://127.0.0.1:8000/reservations/create/",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(
                        reservationData
                    )
                }
            );



            const data =
                await response.json();



            console.log(data);



            if (response.ok) {



                setSuccessMessage(

                    "Réservation confirmée."
                );



                setTimeout(() => {

                    onClose();

                }, 1500);
            }

            else {



                setErrorMessage(

                    data.non_field_errors?.[0]

                    ||

                    "Erreur lors de la réservation."
                );
            }
        }

        catch (error) {



            console.log(error);



            setErrorMessage(

                "Impossible de contacter le serveur."
            );
        }



        setLoading(false);
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

                    Réserver une
                    <br />
                    session

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

                        value={date}

                        onChange={(e) =>

                            setDate(
                                e.target.value
                            )
                        }
                    />



                    <input

                        type="time"

                        value={heure}

                        onChange={(e) =>

                            setHeure(
                                e.target.value
                            )
                        }
                    />



                    <input

                        type="time"

                        value={duree}

                        onChange={(e) =>

                            setDuree(
                                e.target.value
                            )
                        }

                        placeholder="Durée"
                    />



                    {

                        errorMessage && (

                            <p className="reservation-error">

                                {errorMessage}

                            </p>
                        )
                    }



                    {

                        successMessage && (

                            <p className="reservation-success">

                                {successMessage}

                            </p>
                        )
                    }



                    <button

                        className="confirm-button"

                        onClick={
                            handleReservation
                        }

                        disabled={loading}
                    >

                        {

                            loading

                                ?

                                "Chargement..."

                                :

                                "Confirmer la réservation"
                        }

                    </button>

                </div>

            </div>

        </div>
    );
}



export default ReservationModal;