import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { studioName } from "../config/studioLocation";

const SITE_URL = "https://zooneviii.com";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

type SeoConfig = {
    title: string;
    description: string;
    type?: "website" | "article";
    jsonLd?: Record<string, unknown>[];
};

const services = [
    "Enregistrement vocal",
    "Mix",
    "Mastering",
    "Beatmaking",
    "Production musicale",
    "Podcast",
    "Formations audio",
];

const businessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#studio`,
    name: studioName,
    alternateName: "ZoneVIII",
    url: SITE_URL,
    email: "info@zooneviii.com",
    image: OG_IMAGE,
    priceRange: "$$",
    address: {
        "@type": "PostalAddress",
        streetAddress: "25 Rue Bigouette",
        addressLocality: "Quebec",
        addressRegion: "QC",
        postalCode: "G1K 6V5",
        addressCountry: "CA",
    },
    areaServed: "Quebec et environs",
    description:
        "ZooneVIII est un studio d'enregistrement a Quebec specialise en enregistrement vocal, mix, mastering, production musicale, podcast, beatmaking et formations audio.",
    serviceType: services,
};

const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "ZoneVIII",
    alternateName: "ZooneVIII",
    url: SITE_URL,
    email: "info@zooneviii.com",
    logo: `${SITE_URL}/favicon.svg`,
    image: OG_IMAGE,
    description:
        "Studio creatif a Quebec specialise en enregistrement vocal, mix, mastering, beatmaking, production musicale, podcast et formations audio.",
    sameAs: ["https://www.instagram.com/zooneviii"],
};

const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/tarifs#services`,
    name: "Services audio ZoneVIII",
    provider: {
        "@id": `${SITE_URL}/#organization`,
    },
    areaServed: "Quebec et environs",
    serviceType: services,
    description:
        "Services de studio a Quebec pour enregistrement vocal, mix, mastering, beatmaking, production musicale, podcast et formations audio.",
};

const faqItems = [
    {
        question: "Combien coute une session studio a Quebec ?",
        answer:
            "Les tarifs varient selon le service choisi, la duree de la session et le niveau d'accompagnement souhaite. ZoneVIII propose des options pour l'enregistrement, le mix, le mastering, la production musicale, le podcast et les formations.",
    },
    {
        question: "Est-ce que ZoneVIII fait le mix et le mastering ?",
        answer:
            "Oui. ZoneVIII propose des services de mixage et de mastering afin d'ameliorer la clarte, l'equilibre, la puissance et la finition professionnelle de vos morceaux.",
    },
    {
        question: "Peut-on reserver une session d'enregistrement vocal ?",
        answer:
            "Oui. Les artistes peuvent reserver une session d'enregistrement vocal pour singles, EP, albums, demos, voix off ou projets creatifs.",
    },
    {
        question: "Ou est situe ZoneVIII ?",
        answer:
            "ZoneVIII est base a Quebec et s'adresse aux artistes, producteurs, createurs de contenu et entrepreneurs de la region de Quebec et des environs.",
    },
];

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
        },
    })),
};

const recordingArticleCanonical = `${SITE_URL}/blog/comment-bien-senregistrer-en-studio`;
const recordingArticleDescription =
    "Decouvrez comment reussir un enregistrement vocal en studio : distance avec le micro, niveau d'entree, filtre anti-pop, preparation vocale et conseils de prise de son.";

const recordingArticleFaqItems = [
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

const recordingArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
        "Comment bien s'enregistrer en studio : distance, niveau d'entree et preparation vocale",
    description: recordingArticleDescription,
    author: {
        "@type": "Organization",
        name: "ZoneVIII",
        url: SITE_URL,
    },
    publisher: {
        "@type": "Organization",
        name: "ZoneVIII",
        logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/favicon.svg`,
        },
    },
    datePublished: "2026-06-25",
    dateModified: "2026-06-25",
    mainEntityOfPage: recordingArticleCanonical,
    image: OG_IMAGE,
};

const recordingArticleFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: recordingArticleFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
        },
    })),
};

const seoByPath: Record<string, SeoConfig> = {
    "/": {
        title: "Studio d'enregistrement, mix et mastering a Quebec | ZoneVIII",
        description:
            "ZoneVIII est un studio creatif a Quebec specialise en enregistrement vocal, mix, mastering, beatmaking, production musicale, podcast et formations audio.",
        jsonLd: [organizationJsonLd, businessJsonLd],
    },
    "/tarifs": {
        title: "Tarifs studio, mix, mastering et production musicale | ZoneVIII",
        description:
            "Decouvrez les tarifs ZoneVIII pour l'enregistrement vocal, le mix, le mastering, la production musicale, le podcast et les formations audio a Quebec.",
        jsonLd: [serviceJsonLd],
    },
    "/reservations": {
        title: "Reserver une session studio a Quebec | ZoneVIII",
        description:
            "Reservez une session chez ZoneVIII pour l'enregistrement, le mix, le mastering, la production musicale, le podcast ou une formation audio.",
    },
    "/realisations": {
        title: "Realisations audio, mix, mastering et production | ZoneVIII",
        description:
            "Decouvrez les projets realises chez ZoneVIII : enregistrement, mix, mastering, production musicale, podcast et accompagnement artistique.",
    },
    "/experts": {
        title: "Experts audio, beatmakers et ingenieurs du son | ZoneVIII",
        description:
            "Rencontrez les experts ZoneVIII specialises en production musicale, beatmaking, enregistrement vocal, mix, mastering et accompagnement creatif.",
    },
    "/formations": {
        title: "Formations en production musicale, mix et beatmaking | ZoneVIII",
        description:
            "ZoneVIII propose des formations en production musicale, beatmaking, enregistrement vocal, mix, mastering et creation audio a Quebec.",
    },
    "/contact": {
        title: "Contacter ZoneVIII | Studio d'enregistrement a Quebec",
        description:
            "Contactez ZoneVIII pour reserver une session, discuter d'un projet musical, planifier un podcast ou obtenir des informations sur les formations audio.",
    },
    "/blog": {
        title: "ZoneVIII Academy | Guides audio, studio et production musicale",
        description:
            "Guides ZoneVIII pour mieux enregistrer, produire, mixer et finaliser vos projets audio en studio a Quebec.",
    },
    "/blog/comment-bien-senregistrer-en-studio": {
        title: "Comment bien s'enregistrer en studio | Guide vocal ZoneVIII",
        description: recordingArticleDescription,
        type: "article",
        jsonLd: [recordingArticleJsonLd, recordingArticleFaqJsonLd],
    },
    "/a-propos": {
        title: "A propos de ZoneVIII | Studio creatif a Quebec",
        description:
            "Decouvrez ZoneVIII, un studio creatif a Quebec specialise en enregistrement, mix, mastering, production musicale, podcast et formations audio.",
        jsonLd: [organizationJsonLd, businessJsonLd],
    },
    "/faq": {
        title: "FAQ ZoneVIII | Studio, tarifs, reservations et formations",
        description:
            "Trouvez les reponses aux questions frequentes sur les services ZoneVIII : studio, tarifs, reservations, mix, mastering, podcast et formations.",
        jsonLd: [faqJsonLd],
    },
};

function setMetaAttribute(selector: string, attribute: "content" | "href", value: string) {
    const element = document.head.querySelector(selector);

    if (element) {
        element.setAttribute(attribute, value);
    }
}

function setJsonLd(config: SeoConfig) {
    document.querySelectorAll("[data-zoneviii-jsonld]").forEach((element) => element.remove());

    config.jsonLd?.forEach((jsonLd) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.dataset.zoneviiiJsonld = "true";
        script.text = JSON.stringify(jsonLd);
        document.head.appendChild(script);
    });
}

function SeoManager() {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.toLowerCase();
        const config = seoByPath[path] ?? seoByPath["/"];
        const canonicalPath = path === "/" ? "/" : path;
        const canonicalUrl = `${SITE_URL}${canonicalPath}`;

        document.title = config.title;
        setMetaAttribute('meta[name="description"]', "content", config.description);
        setMetaAttribute('link[rel="canonical"]', "href", canonicalUrl);
        setMetaAttribute('meta[property="og:title"]', "content", config.title);
        setMetaAttribute('meta[property="og:description"]', "content", config.description);
        setMetaAttribute('meta[property="og:url"]', "content", canonicalUrl);
        setMetaAttribute('meta[property="og:type"]', "content", config.type ?? "website");
        setMetaAttribute('meta[property="og:image"]', "content", OG_IMAGE);
        setMetaAttribute('meta[name="twitter:title"]', "content", config.title);
        setMetaAttribute('meta[name="twitter:description"]', "content", config.description);
        setMetaAttribute('meta[name="twitter:image"]', "content", OG_IMAGE);
        setJsonLd(config);
    }, [location.pathname]);

    return null;
}

export default SeoManager;
