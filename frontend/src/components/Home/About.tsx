import { GraduationCap, BookOpen, Users } from "lucide-react";
import Card from "./Card";

export default function About() {
  const features = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Academic Excellence",
      description:
        "Comprehensive programs designed to foster critical thinking and innovation",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Modern Curriculum",
      description:
        "Industry-relevant courses that prepare students for tomorrow's challenges",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Vibrant Community",
      description:
        "A diverse student body that enriches learning through collaboration",
    },
  ];

  return (
    <div id="about" className="min-h-screen bg-white px-8 py-20">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-5xl font-light text-red-700 mb-8 tracking-wide">
          About Us
        </h1>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column: Our Story (Takes 3 columns) */}
          <div className="lg:col-span-3">
            <Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-12 bg-red-500 rounded-full"></div>
                <h2 className="text-3xl font-extralight text-red-700 tracking-wide">
                  Taguig City University
                </h2>
              </div>

              <div className="space-y-5 text-gray-600 leading-relaxed text-base">
                <p>
                  Investing in the Lives of Students Since 2006. Motivated by the urgent need to serve the youth of a burgeoning Taguig City, the Local Government Administration enacted Ordinance No. 29 series 2004, titled “An Ordinance Establishing the Pamantasan ng Taguig and Appropriating Funds Therefor.” This initiative was one of the offshoots of the provisions outlined in the Local Government Code. Subsequently, Pamantasan ng Taguig underwent a renaming process and was rebranded as Taguig City University, following the enactment of City Ordinance No. 13, Series of 2009.
                </p>
                <p>
                  All students enrolled at TCU are beneficiaries of the City’s scholarship program wherein their educational expenses are covered by funds allocated from the Taguig City Government, financed by the taxes of its residents. This commitment is aligned with the City Administration’s overarching goal of continually improving access to quality education, enhancing completion rates, fostering a culture of excellence among Taguig residents, and ultimately facilitating a better and more prosperous life for its populace.
                </p>
                <p>
                  TCU flourishes with the unwavering support of the Taguig City Government, under the leadership of Mayor Maria Laarni L. Cayetano, who has spearheaded the city into a Transformative, Lively, and Caring “PROBINSYUDAD™”.
                </p>
              </div>
            </Card>
          </div>

          {/* Right Column: Features (Takes 2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center text-red-600 shadow-sm">
                    {feature.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base font-normal text-red-700 mb-1.5 tracking-wide">
                      {feature.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
