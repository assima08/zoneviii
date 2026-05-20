import Cal, {

    getCalApi

} from "@calcom/embed-react";

import "../styles/BookingWidget.css";

import {

    useEffect

} from "react";



function BookingWidget() {



    useEffect(() => {

        (async function () {

            const cal = await getCalApi();



            cal("ui", {

                theme: "dark",

                styles: {

                    branding: {

                        brandColor: "#2D46FF"
                    }
                }
            });

        })();

    }, []);




    return (

        <div className="cal-wrapper">

            <Cal

                calLink="assima08/mix-mastering"

                style={{

                    width: "100%",

                    height: "100%",

                    border: "none"
                }}

                config={{

                    layout: "month_view"
                }}
            />

        </div>
    );
}



export default BookingWidget;