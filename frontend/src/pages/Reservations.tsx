import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import type {Reservation} from "../interfaces/Reservation.ts";


function Reservations() {

    const location = useLocation();

    const selectedService = location.state?.service;

    return (

        <div>

            <h1>Reservations</h1>

        </div>
    );
}

export default Reservations;