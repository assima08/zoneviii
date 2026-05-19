import "../styles/ReservationCard.css";



interface ReservationCardProps {

    service: string;

    tarif: string;

    prix: string;

    duree: string;

    onReserve: () => void;
}



function ReservationCard({

                             service,

                             tarif,

                             prix,

                             duree,

                             onReserve

                         }: ReservationCardProps) {



    return (

        <div className="reservation-card">

            <div className="reservation-top">

                <h2>

                    {service}

                </h2>



                <span className="reservation-badge">

                    {duree}

                </span>

            </div>



            <p className="reservation-tarif">

                {tarif}

            </p>



            <h3 className="reservation-price">

                {prix}$

            </h3>



            <button

                className="reservation-button"

                onClick={onReserve}
            >

                Réserver maintenant

            </button>

        </div>
    );
}



export default ReservationCard;