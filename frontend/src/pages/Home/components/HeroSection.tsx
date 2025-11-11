import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { scrollToSection } from "../../../utils/utils";

const HeroSection = () => {
  return (
    <section id="home" className="relative w-full h-[calc(70vh)] md:h-screen flex flex-col pt-10 md:pt-32 items-center overflow-hidden">
      {/* Animated Text Container */}
      <motion.div
        className="z-10 text-center px-6 max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <Leaf className="text-emerald-600 w-10 h-10" strokeWidth={1.5} />
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl text-emerald-700 mb-6 font-bold">
          Evergreen College
        </h1>

        {/* Subheading */}
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Nurturing minds, inspiring growth, and building a sustainable future
          through quality education and innovation.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollToSection('courses')}
            className="cursor-pointer rounded-md hover:opacity-80 px-8 py-3 bg-emerald-700 text-white font-medium transition"
          >
            Explore Courses
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
