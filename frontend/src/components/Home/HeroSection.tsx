

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative w-full h-[calc(70vh)] md:h-[calc(100vh-100px)] flex flex-col pt-10 md:pt-32 items-center overflow-hidden"
    >
      <video
        autoPlay
        muted
        loop
        className="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover z-0"
      >
        <source src="/tcuavp.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default HeroSection;
