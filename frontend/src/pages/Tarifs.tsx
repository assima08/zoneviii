import { useEffect, useState } from "react";

import type { Tarif } from "../interfaces/Tarif";
import { getApiErrorMessage, getTarifs } from "../services/api";
import "../styles/tarifs.css";

function Tarifs() {
    const [tarifs, setTarifs] = useState<Tarif[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        async function loadTarifs() {
            try {
                const data = await getTarifs();

                if (isMounted) {
                    setTarifs(data);
                }
            }
            catch (error) {
                if (isMounted) {
                    setErrorMessage(getApiErrorMessage(error));
                }
            }
            finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadTarifs();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <main className="tarifs-page">
            <header className="tarifs-header">
                <p className="tarifs-subtitle">ZooneVIII</p>
                <h1 className="tarifs-title">Tarifs</h1>
            </header>

            <div className="tarifs-grid">
                {loading && (
                    <p className="tarifs-state">Chargement des tarifs...</p>
                )}

                {errorMessage && (
                    <p className="tarifs-state tarifs-state-error">{errorMessage}</p>
                )}

                {!loading && !errorMessage && tarifs.map((tarif) => (
                    <article
                        className="tarif-card"
                        key={tarif.id}
                    >
                        <span>{tarif.typeTarif}</span>
                        <h2>{tarif.nomTarif}</h2>
                        <strong>{tarif.prix}$</strong>
                    </article>
                ))}
            </div>
        </main>
    );
}

export default Tarifs;
