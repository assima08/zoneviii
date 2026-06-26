import { Link } from "react-router-dom";

import "../styles/blog.css";

const articles = [
    {
        title: "Comment bien s'enregistrer en studio : distance, niveau d'entree et preparation vocale",
        description:
            "Un guide simple pour comprendre comment placer sa voix, regler son niveau d'entree et preparer une session d'enregistrement plus propre et plus professionnelle.",
        category: "Enregistrement vocal",
        readingTime: "5 min",
        to: "/blog/comment-bien-senregistrer-en-studio",
    },
];

function Blog() {
    return (
        <main className="blog-page">
            <section className="blog-hero">
                <span>Ressources audio</span>
                <h1>ZoneVIII Academy</h1>
                <p>
                    Guides, conseils et ressources pour mieux enregistrer,
                    produire et finaliser vos projets audio.
                </p>
            </section>

            <section className="blog-grid" aria-label="Articles ZoneVIII Academy">
                {articles.map((article) => (
                    <article className="blog-card" key={article.to}>
                        <div className="blog-card-meta">
                            <span>{article.category}</span>
                            <span>{article.readingTime}</span>
                        </div>

                        <h2>{article.title}</h2>
                        <p>{article.description}</p>

                        <Link to={article.to}>
                            Lire le guide
                        </Link>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default Blog;
