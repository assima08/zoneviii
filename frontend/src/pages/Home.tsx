import Navbar from "../components/navbar.tsx";
import Vinyl from "../components/vinyl.tsx";
import Hero from "../components/hero.tsx";
import Footer from "../components/footer.tsx";

function Home(){
    return (
        <div className="app">


            <Vinyl/>
            <Hero/>
            <Footer/>
        </div>
    )
}
export default Home;