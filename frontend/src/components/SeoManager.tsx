import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://zoneviii.vercel.app";
const DEFAULT_DESCRIPTION =
    "ZoneVIII est un studio créatif premium spécialisé en photographie, production visuelle, branding, réservation de services créatifs et expériences artistiques.";

type SeoConfig = {
    title: string;
    description: string;
};

const seoByPath: Record<string, SeoConfig> = {
    "/": {
        title: "ZoneVIII | Studio créatif premium",
        description: DEFAULT_DESCRIPTION,
    },
    "/services": {
        title: "Services créatifs | ZoneVIII",
        description: "Découvrez les services créatifs premium ZoneVIII pour photographie, production visuelle, branding et expériences artistiques.",
    },
    "/tarifs": {
        title: "Tarifs | ZoneVIII",
        description: "Consultez les tarifs ZoneVIII pour réserver des services créatifs premium et des expériences artistiques sur mesure.",
    },
    "/reservations": {
        title: "Réserver une session | ZoneVIII",
        description: "Réservez une session ZoneVIII pour vos projets créatifs, visuels, branding et expériences artistiques premium.",
    },
    "/experts": {
        title: "Nos experts | ZoneVIII",
        description: "Rencontrez les experts ZoneVIII, un collectif créatif premium dédié à la production visuelle, au branding et aux expériences artistiques.",
    },
    "/contact": {
        title: "Nous contacter | ZoneVIII",
        description: "Contactez ZoneVIII pour une réservation, une demande de branding, de photographie, de production visuelle ou de service créatif premium.",
    },
};

function setMetaAttribute(selector: string, attribute: "content" | "href", value: string) {
    const element = document.head.querySelector(selector);

    if (element) {
        element.setAttribute(attribute, value);
    }
}

function SeoManager() {
    const location = useLocation();

    useEffect(() => {
        const config = seoByPath[location.pathname] ?? seoByPath["/"];
        const canonicalUrl = `${SITE_URL}${location.pathname === "/" ? "/" : location.pathname}`;

        document.title = config.title;
        setMetaAttribute('meta[name="description"]', "content", config.description);
        setMetaAttribute('link[rel="canonical"]', "href", canonicalUrl);
        setMetaAttribute('meta[property="og:title"]', "content", config.title);
        setMetaAttribute('meta[property="og:description"]', "content", config.description);
        setMetaAttribute('meta[property="og:url"]', "content", canonicalUrl);
        setMetaAttribute('meta[name="twitter:title"]', "content", config.title);
        setMetaAttribute('meta[name="twitter:description"]', "content", config.description);
    }, [location.pathname]);

    return null;
}

export default SeoManager;
