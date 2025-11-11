import { useRef } from "react"
import About from "./components/About"
import CoursesSection from "./components/CoursesSection"
import HeroSection from "./components/HeroSection"
import Navbar from "./components/Navbar"
import { Parallax, ParallaxLayer, type IParallax } from '@react-spring/parallax'

const Home = () => {
    const parallax = useRef<IParallax>(null!)

    return (
        <main>
            <div className="hidden lg: hidden lg:block">
                <Parallax ref={parallax} pages={3.4}>
                    <ParallaxLayer className="z-10" offset={0}>
                        <Navbar />
                        <div className="pt-20">
                            <HeroSection />
                        </div>
                    </ParallaxLayer>
                    <ParallaxLayer offset={0.3} speed={-0.2}>
                            <img className="w-full h-screen" src="/illustration.png" />
                    </ParallaxLayer>
                    <ParallaxLayer offset={1.3}>
                        <CoursesSection />
                    </ParallaxLayer>
                    <ParallaxLayer offset={2.3} speed={0.5}>
                        <About />
                    </ParallaxLayer>
                </Parallax>
            </div>

            <div className="relative lg:hidden pt-20">
                <Navbar />
                <div className="relative">
                <HeroSection />
                <img
                    src="/illustration.png"
                    alt="Evergreen illustration"
                    className="absolute bottom-0 w-full max-h-[500px] object-cover opacity-90"
                />
                </div>
                <CoursesSection />
                <About />
            </div>
        </main>
    )
}

export default Home