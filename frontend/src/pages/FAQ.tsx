import { Link } from "react-router-dom";

import "../styles/editorial.css";

const faqs = [
    {
        question: "Combien coute une session studio a Quebec ?",
        answer:
            "Les tarifs varient selon le service choisi, la duree de la session et le niveau d'accompagnement souhaite. ZooneVIII propose des options pour l'enregistrement, le mix, le mastering, la production musicale, le podcast et les formations. Vous pouvez consulter la page Tarifs ou nous contacter pour une recommandation adaptee a votre projet.",
    },
    {
        question: "Est-ce que ZooneVIII fait le mix et le mastering ?",
        answer:
            "Oui. ZooneVIII propose des services de mixage et de mastering afin d'ameliorer la clarte, l'equilibre, la puissance et la finition professionnelle de vos morceaux.",
    },
    {
        question: "Peut-on reserver une session d'enregistrement vocal ?",
        answer:
            "Oui. Les artistes peuvent reserver une session d'enregistrement vocal pour singles, EP, albums, demos, voix off ou projets creatifs.",
    },
    {
        question: "Est-ce que ZooneVIII accompagne les artistes debutants ?",
        answer:
            "Oui. Le studio accompagne autant les artistes debutants que les artistes plus avances. L'objectif est d'aider chaque createur a structurer son projet, ameliorer son son et avancer avec une methode professionnelle.",
    },
    {
        question: "Est-ce que ZooneVIII offre des services de beatmaking ?",
        answer:
            "Oui. ZooneVIII propose de la creation instrumentale, du beatmaking et de l'accompagnement en production musicale selon l'univers artistique du projet.",
    },
    {
        question: "Peut-on enregistrer un podcast chez ZooneVIII ?",
        answer:
            "Oui. ZooneVIII peut accompagner les createurs, entrepreneurs et marques dans l'enregistrement, le montage et l'amelioration sonore de podcasts.",
    },
    {
        question: "Offrez-vous des formations en production musicale ?",
        answer:
            "Oui. ZooneVIII propose des formations liees a la production musicale, au beatmaking, au mix, a l'enregistrement vocal et aux bases de la creation audio.",
    },
    {
        question: "Ou est situe ZooneVIII ?",
        answer:
            "ZooneVIII est base a Quebec et s'adresse aux artistes, producteurs, createurs de contenu et entrepreneurs de la region de Quebec et des environs.",
    },
    {
        question: "Comment reserver une session ?",
        answer:
            "Vous pouvez reserver une session directement depuis la page Reservations ou nous contacter pour discuter de votre projet avant de choisir un service.",
    },
    {
        question: "Quels types de projets peut-on realiser chez ZooneVIII ?",
        answer:
            "ZooneVIII peut accompagner des singles, EP, albums, podcasts, voix off, projets de contenu, sessions d'ecriture, productions instrumentales, mix, mastering et formations.",
    },
];

function FAQ() {
    return (
        <main className="editorial-page">
            <section className="editorial-hero">
                <span>Questions frequentes</span>
                <h1>FAQ ZooneVIII</h1>
                <p>
                    Reponses claires sur le studio, les tarifs, les reservations,
                    le mix, le mastering, le podcast, le beatmaking et les
                    formations audio a Quebec.
                </p>
            </section>

            <section className="faq-list">
                {faqs.map((faq) => (
                    <article key={faq.question} className="faq-item">
                        <h2>{faq.question}</h2>
                        <p>{faq.answer}</p>
                    </article>
                ))}
            </section>

            <section className="editorial-cta">
                <div>
                    <h2>Besoin d'une recommandation ?</h2>
                    <p>
                        Parlez-nous de votre projet audio et nous vous orientons
                        vers le bon service : studio, mix, mastering, podcast ou
                        formation.
                    </p>
                </div>

                <div className="editorial-actions">
                    <Link to="/tarifs">Voir les tarifs</Link>
                    <Link to="/contact">Nous contacter</Link>
                </div>
            </section>
        </main>
    );
}

export default FAQ;
