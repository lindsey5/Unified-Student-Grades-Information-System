import About from "../../components/Home/About"
import CoursesSection from "../../components/Home/CoursesSection"
import HeroSection from "../../components/Home/HeroSection"
import Navbar from "../../components/Home/Navbar"
import PresidentMessage from "../../components/Home/PresidentMessage"
import Footer from "../../components/ui/Footer"
import useProtection from "../../hooks/useProtection"

const Home = () => {
    useProtection();

    return (
        <main>
            <Navbar />
                <HeroSection />
                <PresidentMessage />
                <CoursesSection />
                <About />
            <Footer />
        </main>
    )
}

export default Home