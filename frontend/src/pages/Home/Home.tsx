import About from "../../components/Home/About"
import CoursesSection from "../../components/Home/CoursesSection"
import HeroSection from "../../components/Home/HeroSection"
import Navbar from "../../components/Home/Navbar"
import useProtection from "../../hooks/useProtection"

const Home = () => {
    useProtection();

    return (
        <main className="pt-20">
            <Navbar />
                <HeroSection />
                <img
                    src="/illustration.png"
                    alt="Evergreen illustration"
                    className="absolute bottom-0 w-full max-h-[500px] object-cover opacity-90"
                />
                <CoursesSection />
                <About />
        </main>
    )
}

export default Home