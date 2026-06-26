import { Link } from "react-router-dom";

import "../styles/blog.css";

const quickTips = [
    "Rester stable devant le micro",
    "Eviter de bouger constamment la tete",
    "Se rapprocher legerement pour les passages plus doux",
    "Reculer legerement pour les passages plus puissants",
    "Utiliser un filtre anti-pop pour limiter les plosives",
];

const gainTips = [
    "Ne pas enregistrer dans le rouge",
    "Faire un test de niveau avant la vraie prise",
    "Tester le passage le plus fort du morceau",
    "Garder une marge de securite",
    "Eviter de compenser une mauvaise performance avec trop de volume",
];

const preparationTips = [
    "Pratiquer le morceau plusieurs fois avant la session",
    "Reperer les passages difficiles",
    "Prevoir des references sonores",
    "Eviter d'arriver fatigue",
    "Boire de l'eau",
    "Eviter de forcer la voix juste avant l'enregistrement",
];

const checklist = [
    "Texte memorise ou bien prepare",
    "Instrumental pret",
    "References sonores disponibles",
    "Voix reposee",
    "Bouteille d'eau",
    "Objectif clair pour la session",
    "Niveau d'entree teste",
    "Bonne distance avec le micro",
    "Filtre anti-pop bien place",
];

const articleFaqs = [
    {
        question: "Quelle distance garder avec le micro pour enregistrer une voix ?",
        answer:
            "Une distance d'environ 15 a 20 cm est un bon point de depart, mais elle peut varier selon la puissance de la voix, le style musical et le micro utilise.",
    },
    {
        question: "Quel niveau d'entree viser pour une voix ?",
        answer:
            "Il est recommande de garder une marge de securite et de viser des pics autour de -12 dB a -6 dB afin d'eviter la saturation et de faciliter le mix.",
    },
    {
        question: "Pourquoi utiliser un filtre anti-pop ?",
        answer:
            "Le filtre anti-pop aide a reduire les coups d'air causes par certaines consonnes comme P ou B, ce qui rend la prise vocale plus propre.",
    },
    {
        question: "Faut-il etre parfaitement prepare avant une session studio ?",
        answer:
            "Il est fortement recommande de connaitre son texte, ses intentions et ses passages difficiles avant la session afin de gagner du temps et d'obtenir une meilleure performance.",
    },
];

function BlogArticleRecordingTips() {
    return (
        <main className="article-page">
            <article className="article-shell">
                <header className="article-header">
                    <Link to="/blog" className="article-back">ZoneVIII Academy</Link>
                    <div className="article-meta">
                        <span>Enregistrement vocal</span>
                        <span>5 min</span>
                    </div>
                    <h1>
                        Comment bien s'enregistrer
                    </h1>
                    <p>
                        Un bon enregistrement vocal ne depend pas seulement du
                        micro ou du studio. La qualite finale commence par la
                        facon dont l'artiste se place devant le micro, le niveau
                        d'entree choisi, la preparation de la voix et la maniere
                        d'interpreter le morceau. Chez ZoneVIII, studio
                        d'enregistrement a Quebec, nous accompagnons les artistes
                        pour obtenir des prises vocales propres, expressives et
                        faciles a mixer.
                    </p>
                </header>

                <section>
                    <h2>1. Garder la bonne distance avec le micro</h2>
                    <p>
                        La distance entre la bouche et le micro influence
                        directement le son de la voix. Si l'artiste est trop
                        proche, la voix peut devenir trop lourde, trop chargee en
                        basses ou provoquer des sons agressifs sur certaines
                        consonnes. Si l'artiste est trop loin, la voix peut
                        perdre en presence et capter davantage la piece.
                    </p>
                    <p>
                        En general, une distance d'environ 15 a 20 cm entre la
                        bouche et le micro est un bon point de depart. Cette
                        distance peut varier selon le style vocal, la puissance
                        de la voix et le type de micro utilise.
                    </p>
                    <TipList items={quickTips} />
                </section>

                <section>
                    <h2>2. Bien gerer le niveau d'entree</h2>
                    <p>
                        Le niveau d'entree correspond au volume du signal
                        enregistre avant le traitement audio. Un niveau trop
                        faible peut ajouter du bruit lorsqu'on remonte le volume
                        au mix. Un niveau trop fort peut creer de la saturation
                        numerique difficile a corriger.
                    </p>
                    <p>
                        Pour un enregistrement vocal propre, il faut garder une
                        marge de securite. L'objectif n'est pas d'enregistrer le
                        plus fort possible, mais d'obtenir un signal clair,
                        stable et sans distorsion.
                    </p>
                    <aside className="article-callout">
                        Une bonne pratique est de viser des pics autour de -12
                        dB a -6 dB pendant l'enregistrement. Cela laisse assez
                        de marge pour le mix et evite de faire saturer la prise.
                    </aside>
                    <TipList items={gainTips} />
                </section>

                <section>
                    <h2>3. Utiliser correctement le filtre anti-pop</h2>
                    <p>
                        Le filtre anti-pop aide a reduire les plosives, c'est-a-
                        dire les coups d'air produits par certaines consonnes
                        comme P, B ou T. Ces sons peuvent creer des impacts
                        desagreables dans le micro et compliquer le mix.
                    </p>
                    <p>
                        Le filtre anti-pop doit etre place entre la bouche et le
                        micro. Il ne remplace pas une bonne technique vocale, mais
                        il aide a obtenir une prise plus propre.
                    </p>
                </section>

                <section>
                    <h2>4. Preparer sa voix avant la session</h2>
                    <p>
                        Une bonne session commence avant d'entrer dans le studio.
                        L'artiste doit connaitre son texte, son flow, ses
                        respirations et ses intentions. Plus la preparation est
                        solide, plus la session est efficace.
                    </p>
                    <TipList items={preparationTips} />
                </section>

                <section>
                    <h2>5. Penser a l'interpretation, pas seulement a la justesse</h2>
                    <p>
                        Une prise vocale professionnelle n'est pas seulement une
                        prise juste. Elle doit transmettre une emotion, une
                        energie et une intention. Deux prises peuvent etre
                        techniquement correctes, mais seule celle qui transmet le
                        bon feeling donnera de la force au morceau.
                    </p>
                    <p>
                        Pendant une session chez ZoneVIII, l'objectif est d'aider
                        l'artiste a trouver le bon equilibre entre performance,
                        precision et emotion.
                    </p>
                </section>

                <section>
                    <h2>6. Pourquoi un bon enregistrement facilite le mix</h2>
                    <p>
                        Le mix ne sert pas a reparer entierement une mauvaise
                        prise. Il sert surtout a ameliorer, equilibrer et mettre
                        en valeur une bonne prise. Plus l'enregistrement est
                        propre, plus le mixage devient precis et naturel.
                    </p>
                    <p>
                        Une voix bien enregistree permet d'obtenir plus facilement
                        de la clarte, de la presence, de la puissance et une
                        meilleure integration avec l'instrumental.
                    </p>
                </section>

                <section>
                    <h2>7. Checklist rapide avant une session d'enregistrement</h2>
                    <ul className="article-checklist">
                        {checklist.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section>
                    <h2>Conclusion</h2>
                    <p>
                        Bien s'enregistrer, c'est combiner technique, preparation
                        et interpretation. La distance avec le micro, le niveau
                        d'entree, la stabilite vocale et la preparation du
                        morceau ont un impact direct sur la qualite finale.
                    </p>
                    <p>
                        ZoneVIII accompagne les artistes, producteurs et
                        createurs a Quebec dans leurs sessions d'enregistrement
                        vocal, de mix, de mastering et de production musicale. Si
                        vous preparez un single, un EP, un album ou un projet
                        audio, vous pouvez reserver une session ou nous contacter
                        pour discuter de votre projet.
                    </p>
                </section>

                <section className="article-faq">
                    <h2>FAQ rapide</h2>
                    {articleFaqs.map((faq) => (
                        <div key={faq.question}>
                            <h3>{faq.question}</h3>
                            <p>{faq.answer}</p>
                        </div>
                    ))}
                </section>

                <footer className="article-cta">
                    <h2>Preparer une session chez ZoneVIII</h2>
                    <p>
                        Passez de la preparation a la prise avec un cadre
                        professionnel pour votre session studio a Quebec.
                    </p>
                    <div>
                        <Link to="/reservations">Reserver une session</Link>
                        <Link to="/tarifs">Voir les tarifs</Link>
                        <Link to="/contact">Nous contacter</Link>
                    </div>
                </footer>
            </article>
        </main>
    );
}

function TipList({ items }: { items: string[] }) {
    return (
        <ul className="article-tips">
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

export default BlogArticleRecordingTips;
