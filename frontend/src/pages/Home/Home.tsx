import About from "./components/About"
import CoursesSection from "./components/CoursesSection"
import HeroSection from "./components/HeroSection"
import Navbar from "./components/Navbar"

const Home = () => {

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