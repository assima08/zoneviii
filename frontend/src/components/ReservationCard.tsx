import "../styles/ReservationCard.css"
import type {ReservationCardProps} from "../interfaces/ReservationCardProps.ts";

function ReservationCard({
    service,
    tarif,
    prix,
    duree

}: ReservationCardProps) {
    return (
        <div className="reservation-card">

            <div className="reservation-top">

                <h2>{service}</h2>

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

            <div className="reservation-inputs">

                <input
                    type="date"
                />

                <input
                    type="time"
                />

            </div>

            <button className="reservation-button">

                Réserver maintenant

            </button>

        </div>
    )
}
export default ReservationCard;