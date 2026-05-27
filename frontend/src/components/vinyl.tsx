import vinyl from "../assets/vinyl.webp";
import "../styles/vinyl.css";

function Vinyl() {
    return (
        <div
            className="vinyl-container"
            aria-hidden="true"
        >
            <img
                src={vinyl}
                alt=""
                className="vinyl-image"
                width={500}
                height={500}
                decoding="async"
            />
        </div>
    );
}

export default Vinyl;
