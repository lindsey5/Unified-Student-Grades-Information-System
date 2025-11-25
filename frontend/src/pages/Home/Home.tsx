import About from "../../components/Home/About"
import CoursesSection from "../../components/Home/CoursesSection"
import HeroSection from "../../components/Home/HeroSection"
import Navbar from "../../components/Home/Navbar"
import Footer from "../../components/ui/Footer"
import useProtection from "../../hooks/useProtection"

const Home = () => {
    useProtection();

    return (
        <main>
            <Navbar />
                <HeroSection />
                <img
                    src="/illustration.png"
                    alt="Evergreen illustration"
                    className="absolute bottom-0 w-full max-h-[500px] object-cover opacity-90"
                />
                <CoursesSection />
                <About />
            <Footer />
        </main>
    )
}

export default Home