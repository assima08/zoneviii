import facebookIcon from "../assets/icons/facebook.png";
import instagramIcon from "../assets/icons/instagram.png";
import tiktokIcon from "../assets/icons/tiktok.png";
import xIcon from "../assets/icons/x.png";
import "../styles/footer.css";

const navLinks = [
    { label: "Facebook", href: "https://www.facebook.com/", img: facebookIcon },
    { label: "Instagram", href: "https://www.instagram.com/", img: instagramIcon },
    { label: "X", href: "https://www.x.com/", img: xIcon },
    { label: "TikTok", href: "https://www.tiktok.com/", img: tiktokIcon },
];

function Footer() {
    return (
        <footer className="foot">
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
