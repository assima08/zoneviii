import "../styles/footer.css"

const navlinks = [
    { label: "facebook", href: "https://www.facebook.com/", img:"src/assets/icons/facebook.png" },
    { label: "instagram", href: "https://www.instagram.com/", img:"src/assets/icons/instagram.png"},
    { label: "x", href: "https://www.x.com/", img:"src/assets/icons/x.png"},
    { label: "TikTok", href: "https://www.tiktok.com/", img:"src/assets/icons/tiktok.png"},
];
function footer() {
    return (
        <footer className="foot">
            {navlinks.map((link:{label:string;href:string;img:string}) => (
                <div className="menu-item" key={link.href}>
                    <a className="nav-link" href={link.href}>
                        <img src={link.img} alt="logo" width={40} height={40} />
                    </a>
                </div>
            ))}
        </footer>
    )
}
export default footer;