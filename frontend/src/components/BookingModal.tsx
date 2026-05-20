import "../styles/BookingModal.css";

import BookingWidget from "./BookingWidget";



interface BookingModalProps {

    onClose: () => void;
}



function BookingModal({

    onClose

}: BookingModalProps) {



    return (

        <div className="booking-overlay">



            <div className="booking-modal">



                <button

                    className="booking-close"

                    onClick={onClose}
                >

                    ×

                </button>



                <BookingWidget />



            </div>

        </div>
    );
}



export default BookingModal;