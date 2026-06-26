import facebookIcon from "../assets/icons/facebook.png";
import instagramIcon from "../assets/icons/instagram.png";
import tiktokIcon from "../assets/icons/tiktok.png";
import xIcon from "../assets/icons/x.png";
import "../styles/footer.css";

const navLinks = [
    { label: "Facebook", href: "https://www.facebook.com/", img: facebookIcon },
    { label: "Instagram", href: "https://www.instagram.com/zooneviii", img: instagramIcon },
    { label: "X", href: "https://www.x.com/", img: xIcon },
    { label: "TikTok", href: "https://www.tiktok.com/", img: tiktokIcon },
];

const footerLinks = [
    { label: "A propos", href: "/a-propos" },
    { label: "FAQ", href: "/faq" },
    { label: "Tarifs", href: "/tarifs" },
    { label: "Formations", href: "/formations" },
    { label: "Academy", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

function Footer() {
    return (
        <footer className="footer">
            <nav className="footer-links" aria-label="Navigation secondaire">
                {footerLinks.map((link) => (
                    <a key={link.href} href={link.href}>
                        {link.label}
                    </a>
                ))}
            </nav>

            {navLinks.map((link) => (
                <div
                    className="menu-item"
                    key={link.href}
                >
                    <a
                        className="nav-link"
                        href={link.href}
                        aria-label={link.label}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            src={link.img}
                            alt=""
                            width={40}
                            height={40}
                        />
                    </a>
                </div>
            ))}
        </footer>
    );
}

export default Footer;
