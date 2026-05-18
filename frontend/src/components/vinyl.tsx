import vinyl from "../assets/vinyl.png"
import "../styles/vinyl.css"

function Vinyl(){

    return(

        <div className="vinyl-container">

            <img

                src={vinyl}

                alt="vinyl"

                className="vinyl-image"

            />

        </div>

    );

}



export default Vinyl;