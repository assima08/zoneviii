import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import type { ContactMessagePayload } from "../interfaces/ContactMessage";
import { getApiErrorMessage, sendContactMessage } from "../services/api";
import "../styles/contact.css";

type ToastState = {
    type: "success" | "error";
    message: string;
} | null;

const initialForm: ContactMessagePayload = {
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: "",
    website: "",
};

function Contact() {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState<ToastState>(null);

    const isValid = useMemo(() => {
        return (
            form.nom.trim().length >= 2
            && form.prenom.trim().length >= 2
            && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
            && /^[0-9+().\-\s]{6,30}$/.test(form.telephone.trim())
            && form.sujet.trim().length >= 2
            && form.message.trim().length >= 10
        );
    }, [form]);

    function updateField(field: keyof ContactMessagePayload, value: string) {
        setForm((currentForm) => ({
            ...currentForm,
            [field]: value,
        }));
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!isValid) {
            setToast({
                type: "error",
                message: "Complete les champs requis avant l'envoi.",
            });
            return;
        }

        setLoading(true);
        setToast(null);

        try {
            await sendContactMessage({
                nom: form.nom.trim(),
                prenom: form.prenom.trim(),
                email: form.email.trim(),
                telephone: form.telephone.trim(),
                sujet: form.sujet.trim(),
                message: form.message.trim(),
                website: form.website?.trim(),
            });

            setForm(initialForm);
            setToast({
                type: "success",
                message: "Message envoye. L'equipe ZoneVIII te repondra rapidement.",
            });
        }
        catch (error) {
            setToast({
                type: "error",
                message: getApiErrorMessage(error),
            });
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <main className="contact-page">
            <section className="contact-hero">
                <p className="contact-kicker">NOUS CONTACTER</p>
                <h1>Parlons de ton prochain son.</h1>
                <p>
                    Session studio, mix, mastering ou direction artistique:
                    l'equipe ZoneVIII te repond avec une approche claire,
                    rapide et sur mesure.
                </p>
            </section>

            <section className="contact-shell">
                <aside className="contact-panel">
                    <span className="contact-panel-label">Studio premium</span>
                    <h2>ZoneVIII</h2>
                    <p>
                        Un point d'entree simple pour les artistes, managers et
                        equipes creatives qui veulent avancer proprement.
                    </p>

                    <div className="contact-meta-grid">
                        <div>
                            <span>Email</span>
                            <strong>info@zooneviii.com</strong>
                        </div>
                        <div>
                            <span>Reponse</span>
                            <strong>24-48h</strong>
                        </div>
                        <div>
                            <span>Services</span>
                            <strong>Mix / Master / Prod</strong>
                        </div>
                    </div>
                </aside>

                <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className="contact-form-row">
                        <label>
                            <span>Nom</span>
                            <input
                                value={form.nom}
                                onChange={(event) => updateField("nom", event.target.value)}
                                disabled={loading}
                                autoComplete="family-name"
                                required
                            />
                        </label>

                        <label>
                            <span>Prenom</span>
                            <input
                                value={form.prenom}
                                onChange={(event) => updateField("prenom", event.target.value)}
                                disabled={loading}
                                autoComplete="given-name"
                                required
                            />
                        </label>
                    </div>

                    <div className="contact-form-row">
                        <label>
                            <span>Email</span>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(event) => updateField("email", event.target.value)}
                                disabled={loading}
                                autoComplete="email"
                                required
                            />
                        </label>

                        <label>
                            <span>Telephone</span>
                            <input
                                type="tel"
                                value={form.telephone}
                                onChange={(event) => updateField("telephone", event.target.value)}
                                disabled={loading}
                                autoComplete="tel"
                                required
                            />
                        </label>
                    </div>

                    <label className="contact-honeypot" aria-hidden="true">
                        <span>Site web</span>
                        <input
                            value={form.website || ""}
                            onChange={(event) => updateField("website", event.target.value)}
                            tabIndex={-1}
                            autoComplete="off"
                        />
                    </label>

                    <label>
                        <span>Sujet</span>
                        <input
                            value={form.sujet}
                            onChange={(event) => updateField("sujet", event.target.value)}
                            disabled={loading}
                            required
                        />
                    </label>

                    <label>
                        <span>Message</span>
                        <textarea
                            value={form.message}
                            onChange={(event) => updateField("message", event.target.value)}
                            disabled={loading}
                            rows={6}
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={loading || !isValid}
                    >
                        {loading ? "Envoi en cours..." : "Envoyer"}
                    </button>
                </form>
            </section>

            {toast && (
                <div
                    className={`contact-toast contact-toast-${toast.type}`}
                    role={toast.type === "error" ? "alert" : "status"}
                    aria-live="polite"
                >
                    {toast.message}
                </div>
            )}
        </main>
    );
}

export default Contact;
